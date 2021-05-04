import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitasService } from 'src/app/services/citas.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Citas } from 'src/app/models/citas';
import { Usuarios } from 'src/app/models/usuarios';


@Component({
  selector: 'app-previo-citas',
  templateUrl: './previo-citas.page.html',
  styleUrls: ['./previo-citas.page.scss'],
})
export class PrevioCitasPage implements OnInit {

  file: File;
  usuario: Usuarios = new Usuarios();
  cita: Citas = new Citas();
  loading: any;
  imageSrc: string | ArrayBuffer;
  constructor(private citasService: CitasService,
              private usuarioService: UsuarioService,
              public loadingController: LoadingController,
              private angularFireStorage: AngularFireStorage,
              private router: Router,
              private alertCtrt: AlertController,) { }

  ngOnInit() {
    this.usuarioService.getUsuario( localStorage.getItem('userId')).subscribe(res => this.usuario = res)
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file);
    }
  }

  registrarCita(form){
    this.presentLoading("Espere por favor...");
   // this.cita.Apellido = this.usuario.Apellido;
   // this.cita.Nombre = this.usuario.Nombre;
    this.usuario.Descripcion = form.value.descripcion;
    this.usuario.Nacimiento = form.value.nacimiento;
    this.usuario.Busca = form.value.busca;
    this.usuario.Sexo = form.value.sexo;
   // this.cita.Activa = true;
   // this.cita.Usuario = localStorage.getItem('userId')
 
   // console.log(this.cita)
    // this.guardarArchivo();

    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.usuario).then(
      auth=>{


        this.router.navigate(["/mis-chat"])
        this.loading.dismiss();
      }       
      ).catch(async error => {
        this.loading.dismiss();
        this.failedAlert("Algo salió mal, inténtelo de nuevo");
      })

  }

  // crearPublicacion(form){
  //   this.presentLoading("Espere por favor...");
  //   var fechaActual = new Date();
  //   this.publicacion.Titulo = form.value.titulo
  //   this.publicacion.Descripcion = form.value.descripcion
  //   this.publicacion.Estudiante = localStorage.getItem('userId')
  //   this.publicacion.Fecha = fechaActual.toString();
  //   this.publicacion.Visitas = 0;
  //   if(this.rol == 'Ayudante'){
  //   this.publicacion.Materia = form.value.curso;}
  //   if(this.rol == 'Estudiante'){
  //     this.publicacion.Materia = 'Estudiante';}
    
  //   console.log(form.value.curso)
  //   this.publicacion.Visibilidad = true;
  //   this.publicacion.Rol = localStorage.getItem('Rol')
 
  //   this.usuario.Publicaciones = this.usuario.Publicaciones + 1;
  //   this.guardarArchivo();
    
  // }

  guardarArchivo(){
    var storageRef = this.angularFireStorage.storage.ref()  
    storageRef.child(this.file.name).put(this.file)
    .then(
      data=>{
        data.ref.getDownloadURL().then(
        downloadURL => {this.registroCompleto()})
        .catch(err=>{
          this.loading.dismiss();
          console.log('error')});
        }
    )     
  }

  registroCompleto(){
   // this.cita.Foto=downloadURL;
    
    this.citasService.addCita(this.cita,localStorage.getItem('userId')).then(
      auth=>{
        this.loading.dismiss();
        this.usuario.Citas = true;
        this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.usuario)

        this.router.navigate(["/publicaciones"])
      }       
    ).catch(async error => {
      this.loading.dismiss();
      this.failedAlert("Algo salió mal, inténtelo de nuevo");
    })
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      //duration: 2000
    });
    return this.loading.present();
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
  


}
