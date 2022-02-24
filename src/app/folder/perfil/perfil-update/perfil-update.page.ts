import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MensajeErrorService } from 'src/app/services/mensaje-error.service';


@Component({
  selector: 'app-perfil-update',
  templateUrl: './perfil-update.page.html',
  styleUrls: ['./perfil-update.page.scss'],
})
export class PerfilUpdatePage implements OnInit {

  public user: Usuarios=new Usuarios();
  public image;
  public image1;
  file: File;
  file1: File;
  loading: HTMLIonLoadingElement;
  nombre;
  apellido;
  correo;

  constructor(private usuarioService: UsuarioService,
              private angularFireStorage: AngularFireStorage,
              public loadingController: LoadingController,
              private router: Router,
              private alertCtrt: AlertController,
              private mensajeErrorService: MensajeErrorService,
              ) { }

  ngOnInit() {


    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res; this.image=res.FotoPerfil;this.image1 = res.Foto2});

  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      //duration: 2000
    });
    return this.loading.present();
  }


  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.image = reader.result;

        reader.readAsDataURL(this.file);
    }
  }


  readURL1(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file1 = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.image1 = reader.result;

        reader.readAsDataURL(this.file1);
    }
  }


  async UpdateUser(form):Promise<void>{
   // this.presentLoading("Espere por favor...");
   this.presentLoading("Espere por favor...");
    
    var telefono;

    if(form.value.nombre == ''){
      this.nombre = this.user.Nombre
    }else{
      this.nombre = form.value.nombre
    }

    if(form.value.apellido == ''){
      this.apellido = this.user.Apellido
    }else{
      this.apellido = form.value.apellido
    }


    if(form.value.correo == ''){
      this.correo = this.user.Correo
    }else{
      this.correo = form.value.correo
    }

    if(form.value.telefono != ''){
      telefono = form.value.telefono;
      if(telefono.length==10){
        telefono = '+593' + telefono.slice(1,telefono.length);
      }
      
    }else{
      telefono = this.user.Telefono
    }

    if(this.file ==  null && this.file1 == null){
      this.UpdateUserCompleto(telefono,this.user.FotoPerfil, this.user.Foto2)

    }
    if(this.file != null && this.file1 == null){
      this.guardarArchivoFoto1(telefono, this.user.Foto2)
    }

    if(this.file == null && this.file1 != null){
      this.guardarArchivoFoto2(telefono, this.user.FotoPerfil)
    }

    if(this.file != null && this.file1 != null){
      this.guardarArchivo(telefono)
    }
    

    
    // if(this.file!='null'){
    //   this.guardarArchivo(telefono);
    // }
    // else{
      
    // }
    
  }

  guardarArchivoFoto1(telefono: string, foto: string){
    var storageRef = this.angularFireStorage.storage.ref()
    storageRef.child(this.file.name).put(this.file)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {
                          this.UpdateUserCompleto(telefono, downloadURL, foto)
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la foto de perfil, intentelo de nuevo")});
            }
    )     
  }

  guardarArchivo(telefono: string){
    var storageRef = this.angularFireStorage.storage.ref()

    storageRef.child(this.file.name).put(this.file)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {
                          this.guardarArchivo1(telefono, downloadURL)
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la primera foto de perfil")});
            }
    )     
  }

  guardarArchivo1(telefono: string, downloadURL: string){
    var storageRef = this.angularFireStorage.storage.ref()
    storageRef.child(this.file1.name).put(this.file1)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL1 => {
                          this.UpdateUserCompleto(telefono, downloadURL, downloadURL1)
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la segunda foto de perfil")});
            }
    ) 
  }

  guardarArchivoFoto2(telefono: string, foto: string){
    var storageRef = this.angularFireStorage.storage.ref()
    storageRef.child(this.file1.name).put(this.file1)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {
                          this.UpdateUserCompleto(telefono, foto, downloadURL)
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la segunda foto de perfil, intentelo de nuevo")});
            }
    )     
  }

  async failedAlert(text: string) {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: text,
    buttons: [{
    text: 'OK',
      handler: () => {
        
      }
    }]   
    });
    await alert.present();
  }

 

  
  async UpdateUserCompleto(telefono: string, downloadURL:string, downloadURL1:string){
    this.user.Telefono = telefono;
    this.user.FotoPerfil = downloadURL;
    this.user.Foto2 = downloadURL1;
    this.user.Nombre = this.nombre;
    this.user.Apellido = this.apellido
    var userId = localStorage.getItem('userId')
    // localStorage.setItem('FotoPerfil',downloadURL);
    this.usuarioService.updateUsuario(userId, this.user).
    then(
      auth=>{
        this.loading.dismiss();
        
        this.router.navigateByUrl("/perfil")
       
       
      }  
    ).catch(async error => {
      console.log(error)
      this.loading.dismiss();
      var mensaje=error.code.split('/')[1];
      const presentarMensaje = this.mensajeErrorService.AuthErrorCodeSpanish(mensaje);
      this.failedAlert(presentarMensaje)
    })
  }



}
