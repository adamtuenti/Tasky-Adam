import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from 'angularfire2/storage';

import { Adopcion } from 'src/app/models/adopcion';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-adopcion-editar',
  templateUrl: './adopcion-editar.page.html',
  styleUrls: ['./adopcion-editar.page.scss'],
})
export class AdopcionEditarPage implements OnInit {
  public adopcion: Adopcion=new Adopcion();
  file2: File;
  imageSrc: string | ArrayBuffer;
  file1: File;
  loading: any;
  imageSrc2: string | ArrayBuffer;
  id: string;

  image: string;
  image1: string;

  constructor(private angularFireStorage: AngularFireStorage,
    private router: Router,
    private adopcionService: AdopcionService,
    private alertCtrt: AlertController,
    private activateRoute: ActivatedRoute,          
    public loadingController: LoadingController,) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.id = id;
      this.adopcionService.getAdopcion(id).subscribe(res=>{this.adopcion = res;this.image = res.Foto1;this.image1 = res.Foto2});
      
    });
  }
  
  readURL1(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file1 = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file1);
        this.guardarunarchivo(this.file1,1)
    }
  }

  eliminarFoto2(){
    this.image1 = '';
    this.adopcion.Foto2 = '';
  }

  eliminarFoto1(){
    this.image = '';
    this.adopcion.Foto1 = '';
  }

  readURL2(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file2 = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc2 = reader.result;

        reader.readAsDataURL(this.file2);
        this.guardarunarchivo(this.file2,2)
    }
  }


  crearAdopcion(form){
    this.presentLoading("Espere por favor...");
    this.adopcion.Titulo = form.value.titulo
    this.adopcion.Descripcion = form.value.descripcion
    if(this.file1 != null && this.file2 != null){
    this.guardarArchivo();}
    else if(this.file1 != null){
      this.guardarunarchivo(this.file1, 1);this.registroCompleto()}
    else if(this.file2 != null){
        this.guardarunarchivo(this.file2, 2);this.registroCompleto()}  
    else{
      this.registroCompleto()
    }


    
  }
  guardarunarchivo(file, num){
    
    var storageRef = this.angularFireStorage.storage.ref()  
    storageRef.child(file.name).put(file)
    .then(
      data=>{
        data.ref.getDownloadURL().then(
        downloadURL => {
          if(num == 1){this.adopcion.Foto1=downloadURL;this.image=downloadURL;}
          else if(num == 2){this.adopcion.Foto2=downloadURL;this.image1=downloadURL;}
          
          
             
        })
        .catch(err=>{
          this.loading.dismiss();
          console.log('error')});
        }
    )     
  }
  
  guardarArchivo(){
    var storageRef = this.angularFireStorage.storage.ref()  
    storageRef.child(this.file1.name).put(this.file1)
    .then(
      data=>{
        data.ref.getDownloadURL().then(
        downloadURL => {this.adopcion.Foto1=downloadURL;



          var storageRef = this.angularFireStorage.storage.ref()  
          storageRef.child(this.file2.name).put(this.file2)
          .then(
            data=>{
              data.ref.getDownloadURL().then(
              downloadURL => {this.adopcion.Foto2=downloadURL;
                              this.registroCompleto()                            
              })
              .catch(err=>{
                this.loading.dismiss();
                console.log('error')});
              }
          )
                        
        
        
        })
        .catch(err=>{
          this.loading.dismiss();
          console.log('error')});
        }
    )     
  }

  registroCompleto(){
    
    
    this.adopcionService.updateAdopcion(this.id,this.adopcion).then(
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
