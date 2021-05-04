import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from 'angularfire2/storage';

import { Adopcion } from 'src/app/models/adopcion';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-adopcion-crear',
  templateUrl: './adopcion-crear.page.html',
  styleUrls: ['./adopcion-crear.page.scss'],
})
export class AdopcionCrearPage implements OnInit {
  
  public adopcion: Adopcion=new Adopcion();
  file2: File;
  imageSrc: string | ArrayBuffer;
  file1: File;
  loading: any;
  imageSrc2: string | ArrayBuffer;
  public image: File;
  public image1: File;

  constructor(private angularFireStorage: AngularFireStorage,
    private router: Router,
    private adopcionService: AdopcionService,
    private alertCtrt: AlertController,
    private activateRoute: ActivatedRoute,          
    public loadingController: LoadingController,) { }

  ngOnInit() {
  }

  readURL1(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file1 = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file1);
        this.guardarArchivo1();
    }
  }

  guardarArchivo1(){
    var storageRef = this.angularFireStorage.storage.ref()  
    storageRef.child(this.file1.name).put(this.file1)
    .then(
      data=>{
        data.ref.getDownloadURL().then(
        downloadURL => {this.adopcion.Foto1=downloadURL;
        this.image = downloadURL;



          
                        
        
        
        })
        .catch(err=>{
          this.loading.dismiss();
          console.log('error')});
        }
    )     

  }

  

  readURL2(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file2 = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc2 = reader.result;

        reader.readAsDataURL(this.file2);
        this.guardarArchivo2();
    }
  }

  guardarArchivo2(){
    var storageRef = this.angularFireStorage.storage.ref()  
    storageRef.child(this.file2.name).put(this.file2)
    .then(
      data=>{
        data.ref.getDownloadURL().then(
        downloadURL => {this.adopcion.Foto2=downloadURL;
                      this.image1 = downloadURL;
                                                   
        })
        .catch(err=>{
          this.loading.dismiss();
          console.log('error')});
        }
    )
  }

  crearAdopcion(form){
    this.presentLoading("Espere por favor...");
    var fechaActual = new Date();
    this.adopcion.Titulo = form.value.titulo
    this.adopcion.Descripcion = form.value.descripcion
    this.adopcion.Usuario = localStorage.getItem('userId')
    this.adopcion.Fecha = fechaActual.toString(); 
    this.adopcion.Visitas = 0;  
    this.adopcion.Tipo = form.value.tipo; 
    this.registroCompleto();
    
  }

  guardarArchivo(){
    
  }

  registroCompleto(){
    
    
    this.adopcionService.addAdopcion(this.adopcion).then(
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
