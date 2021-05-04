import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MensajeErrorService } from 'src/app/services/mensaje-error.service';

@Component({
  selector: 'app-editar-perfil-cita',
  templateUrl: './editar-perfil-cita.page.html',
  styleUrls: ['./editar-perfil-cita.page.scss'],
})
export class EditarPerfilCitaPage implements OnInit {

  public user: Usuarios=new Usuarios();
  public image;
  public image1;
  file: File;
  file1: File;
  loading: HTMLIonLoadingElement;
  miSexo;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

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
    
    var busca;
    var descripcion;

    if(form.value.busca != ''){
      busca = form.value.busca;
    }else{
      busca = this.user.Busca
    }

    // if(form.value.miSexo == ''){
    //   this.miSexo = this.user.Sexo
    // }else{
    //   this.miSexo = form.value.miSexo
    // }

    if(form.value.descripcion != ''){
      descripcion = form.value.descripcion;
    }else{
      descripcion = this.user.Descripcion
    }



    if(this.file ==  null && this.file1 == null){
      this.UpdateUserCompleto(descripcion, busca,this.user.FotoPerfil, this.user.Foto2)

    }
    if(this.file != null && this.file1 == null){
      this.guardarArchivoFoto1(descripcion, busca, this.user.Foto2)
    }

    if(this.file == null && this.file1 != null){
      this.guardarArchivoFoto2(descripcion, busca, this.user.FotoPerfil)
    }

    if(this.file != null && this.file1 != null){
      this.guardarArchivo(descripcion, busca)
    }
    

    
    
  }

  guardarArchivoFoto1(descripcion: string, busca: string, foto: string){
    var storageRef = this.angularFireStorage.storage.ref()
    storageRef.child(this.file.name).put(this.file)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {
                          this.UpdateUserCompleto(descripcion, busca, downloadURL, foto)
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la foto de perfil, intentelo de nuevo")});
            }
    )     
  }

  guardarArchivo(descripcion: string, busca: string){
    var storageRef = this.angularFireStorage.storage.ref()

    storageRef.child(this.file.name).put(this.file)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {
                          this.guardarArchivo1(descripcion, busca, downloadURL)
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la primera foto de perfil")});
            }
    )     
  }

  guardarArchivo1(descripcion: string, busca: string, downloadURL: string){
    var storageRef = this.angularFireStorage.storage.ref()
    storageRef.child(this.file1.name).put(this.file1)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL1 => {
                          this.UpdateUserCompleto(descripcion, busca, downloadURL, downloadURL1)
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la segunda foto de perfil")});
            }
    ) 
  }

  guardarArchivoFoto2(descripcion: string, busca: string, foto: string){
    var storageRef = this.angularFireStorage.storage.ref()
    storageRef.child(this.file1.name).put(this.file1)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {
                          this.UpdateUserCompleto(descripcion, busca, foto, downloadURL)
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

 

  
  async UpdateUserCompleto(descripcion: string, busca: string, downloadURL:string, downloadURL1:string){
    this.user.Descripcion = descripcion;
    this.user.Busca = busca;
    this.user.FotoPerfil = downloadURL;
    this.user.Foto2 = downloadURL1;
    // this.user.Sexo = this.miSexo;
    var userId = localStorage.getItem('userId')
    // localStorage.setItem('FotoPerfil',downloadURL);
    this.usuarioService.updateUsuario(userId, this.user).
    then(
      auth=>{
        this.loading.dismiss();
        
        this.router.navigateByUrl("/mi-perfil-cita")
       
       
      }  
    ).catch(async error => {
      this.loading.dismiss();
      var mensaje=error.code.split('/')[1];
      const presentarMensaje = this.mensajeErrorService.AuthErrorCodeSpanish(mensaje);
      this.failedAlert(presentarMensaje)
    })
  }



}
