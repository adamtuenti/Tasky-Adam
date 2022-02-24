import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from 'angularfire2/storage';

import { LoadingController } from '@ionic/angular';
import { MensajeErrorService } from 'src/app/services/mensaje-error.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  file: File;
  file1: File;
  imageSrc: string | ArrayBuffer;
  imageCarnet;
  loading: HTMLIonLoadingElement;
  constructor(private angularFireStorage: AngularFireStorage,
              private authService:AuthService,
              private router: Router,
              private mensajeErrorService: MensajeErrorService,
              private alertCtrt: AlertController,
              public loadingController: LoadingController,
             ) { }

  ngOnInit() {
    
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
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file);
    }
  }

  readURL1(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file1 = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageCarnet = reader.result;

        reader.readAsDataURL(this.file1);
    }
  }

  async RegistrarUser(form):Promise<void>{
    this.presentLoading("Espere por favor...");
    var telefono = form.value.telefono;
    var primeros = telefono.slice(0,3);
    if(telefono.slice(0,1)==0){
      telefono = '+593' + telefono.slice(1,telefono.length);
    }
    else if(primeros == '+593'){
      telefono = telefono
    }
    
    
    this.RegistrarUserCompleto(form.value.email, form.value.password,form.value.nombre, form.value.apellido, form.value.matricula, telefono, this.imageCarnet);
  }

  guardarArchivo(email:string, password:string, nombre:string ,apellido:string, matricula: string, telefono: string){
    
    var storageRef = this.angularFireStorage.storage.ref()

    // var storageRef1 = this.angularFireStorage.storage.ref()
    
    storageRef.child(this.file1.name).put(this.file1)
    .then(
      data=>{data.ref.getDownloadURL().then(
          downloadURL1 =>this.RegistrarUserCompleto(email, password, nombre ,apellido, matricula, telefono, downloadURL1)  
          )}
      ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la foto del carnet, intentelo de nuevo")});
      



            // data=>{
            //         data.ref.getDownloadURL().then(
            //             downloadURL => {
                          
            //                 storageRef1.child(this.file1.name).put(this.file1)
            //                 .then(
            //                   data=>{data.ref.getDownloadURL().then(
            //                     downloadURL1 =>this.RegistrarUserCompleto(email, password, nombre ,apellido, matricula, telefono, downloadURL, downloadURL1)  
            //                     )}
            //                 ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la foto del carnet, intentelo de nuevo")});
                            
                          
                      
            //             }
            //         ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la foto de perfil, intentelo de nuevo")});
                    

            // }
    // )     


  }

 

  
  async RegistrarUserCompleto(email:string, password:string, nombre:string ,apellido:string, matricula: string, telefono: string, downloadURL1:string){
    this.authService.signupnUser(email, password,nombre ,apellido, matricula, telefono, downloadURL1).
    then(
      auth=>{
        this.loading.dismiss();
        
          this.router.navigateByUrl("/pendiente")
       
       
      }  
    ).catch(async error => {
      this.loading.dismiss();
      var mensaje=error.code.split('/')[1];
      const presentarMensaje = this.mensajeErrorService.AuthErrorCodeSpanish(mensaje);
      this.failedAlert(presentarMensaje)
    })
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