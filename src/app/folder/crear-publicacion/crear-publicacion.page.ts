import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

import { PublicacionesMateria } from 'src/app/models/publicaciones-materia';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
})
export class CrearPublicacionPage implements OnInit {
  public publicacion: PublicacionesMateria=new PublicacionesMateria();
  usuario: Usuarios = new Usuarios();
  loading: any;
  id: any;
  miId: string;
  file: File;
  imageSrc: string | ArrayBuffer;
  rol: string;
  constructor(
    private angularFireStorage: AngularFireStorage,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertCtrt: AlertController,
    private activateRoute: ActivatedRoute,          
    public loadingController: LoadingController,
    private publicacionesService: PublicacionesService) { 
      this.usuarioService.getUsuario( localStorage.getItem('userId')).subscribe(res => {this.usuario = res; this.rol=res.Rol})
    
    }

  ngOnInit() {
    this.miId = localStorage.getItem('userId'); 
    this.activateRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.id = id;
    });
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file);
    }
  }

  crearPublicacion(form){
    this.presentLoading("Espere por favor...");
    var fechaActual = new Date();
    this.publicacion.Titulo = form.value.titulo
    this.publicacion.Descripcion = form.value.descripcion
    this.publicacion.Estudiante = localStorage.getItem('userId')
    this.publicacion.Fecha = fechaActual.toString();
    this.publicacion.Visitas = 0;
    this.publicacion.Materia = this.id;
    this.publicacion.Visibilidad = true;
    this.publicacion.Rol = this.rol
 
    this.usuario.Publicaciones = this.usuario.Publicaciones + 1;
    this.guardarArchivo();
    
  }

  guardarArchivo(){
    var storageRef = this.angularFireStorage.storage.ref()  
    storageRef.child(this.file.name).put(this.file)
    .then(
      data=>{
        data.ref.getDownloadURL().then(
        downloadURL => {this.registroCompleto(downloadURL)})
        .catch(err=>{console.log('error')});
        }
    )     
  }

  registroCompleto(downloadURL:string){
    this.publicacion.Foto=downloadURL;
    
    this.usuarioService.updateUsuario(this.miId,this.usuario)
    this.publicacionesService.addPublicacionesMateria(this.publicacion).then(
      auth=>{
        this.loading.dismiss();

        this.router.navigate(["/curso-detalle",this.id,''])
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
