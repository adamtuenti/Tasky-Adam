import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { PublicacionesMateria } from 'src/app/models/publicaciones-materia';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.page.html',
  styleUrls: ['./editar-publicacion.page.scss'],
})
export class EditarPublicacionPage implements OnInit {

  public publicacion: PublicacionesMateria=new PublicacionesMateria();
  loading: any;
  imageSrc: string | ArrayBuffer;
  file: File;
  id: string;
  redireccion: string;
  image;
  constructor(
    private router: Router,
    private angularFireStorage: AngularFireStorage,
    private activateRoute: ActivatedRoute,
    private alertCtrt: AlertController,
    public loadingController: LoadingController,
    private publicacionesService: PublicacionesService,) { 
      
    }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.redireccion = paramMap.get('redireccion');
      this.id =id;
    this.publicacionesService.getPublicacionMateria(id).subscribe(res=> {this.publicacion = res;this.image = res.Foto});
    });
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

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
       this.file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(this.file);       
    }
  }

  removeFile(){
    this.file = null;
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      //duration: 2000
    });
    return this.loading.present();
  }

  Actualizar(form){
    this.presentLoading("Espere por favor...");
    this.guardarArchivo(form.value.titulo, form.value.descripcion);
  }

  guardarArchivo(titulo:string, descripcion:string){
    
    if(this.file != null){
    var storageRef = this.angularFireStorage.storage.ref()
    storageRef.child(this.file.name).put(this.file)
    .then(
      data=>{data.ref.getDownloadURL().then(
        downloadURL =>this.RegistroCompleto(titulo, descripcion, downloadURL)  
        )}
    ).catch(err=>{this.loading.dismiss(); 
                  this.failedAlert("Error al cargar el archivo, intentelo de nuevo")});
    }else{
      this.RegistroCompleto(titulo, descripcion, null) 
    }
  }

  async RegistroCompleto(titulo:string, descripcion:string,downloadURL:string){
    this.publicacion.Titulo = titulo;
    this.publicacion.Descripcion = descripcion;

    if(this.file != null){
    this.publicacion.Foto = downloadURL;
    }

    this.publicacionesService.updatePublicacionesMateria(this.id, this.publicacion).  
    then(
      auth=>{
        this.loading.dismiss();
        if(this.redireccion == 'Publicacion'){
          this.router.navigate(['/publicaciones']);
        }
        if(this.redireccion == 'Curso'){
          this.router.navigate(['/curso-detalle',this.publicacion.Materia,this.publicacion.Titulo]);
        }        
      }       
    ).catch(async error => {
      this.loading.dismiss();
      this.failedAlert("Algo salio mal, intentelo de nuevo");
    })
  }



}
