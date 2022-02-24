import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

import { PublicacionesMateria } from 'src/app/models/publicaciones-materia';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { AyudantesService } from 'src/app/services/ayudantes.service';
import { CursosService } from 'src/app/services/cursos.service';
import { Ayudantes } from 'src/app/models/ayudantes';
import { Cursos } from 'src/app/models/cursos';
 
@Component({
  selector: 'app-crear-publicacion-todos',
  templateUrl: './crear-publicacion-todos.page.html',
  styleUrls: ['./crear-publicacion-todos.page.scss'],
})
export class CrearPublicacionTodosPage implements OnInit {
  public publicacion: PublicacionesMateria=new PublicacionesMateria();
  usuario: Usuarios = new Usuarios();
  loading: any;
  id: any;
  miId: string;
  file: File;
  imageSrc: string | ArrayBuffer;
  ayudantias:Ayudantes[]= [];
  cursos:Cursos[]= [];
  rol: string;
  constructor(private ayudanteService: AyudantesService,
    private cursosService: CursosService,
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
    this.ayudanteService.getAyudantes().subscribe(res => this.ayudantias = res);
    this.cursosService.getCursos().subscribe(res => this.cursos = res);
    this.miId = localStorage.getItem('userId');
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
    if(this.rol == 'Ayudante'){
    this.publicacion.Materia = form.value.curso;}
    if(this.rol == 'Estudiante'){
      this.publicacion.Materia = 'Estudiante';}
    
    console.log(form.value.curso)
    this.publicacion.Visibilidad = true;
    this.publicacion.Rol = this.rol;
 
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
        .catch(err=>{
          this.loading.dismiss();
          console.log('error')});
        }
    )     
  }

  registroCompleto(downloadURL:string){
    this.publicacion.Foto=downloadURL;
    
    this.usuarioService.updateUsuario(this.miId,this.usuario)
    this.publicacionesService.addPublicacionesMateria(this.publicacion).then(
      auth=>{
        this.loading.dismiss();

        this.router.navigate(["/adopcion"])
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
