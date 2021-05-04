import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { MensajeErrorService } from 'src/app/services/mensaje-error.service';

import { ChatUser } from 'src/app/models/ChatUser';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-mi-perfil-cita',
  templateUrl: './mi-perfil-cita.page.html',
  styleUrls: ['./mi-perfil-cita.page.scss'],
})
export class MiPerfilCitaPage implements OnInit {

  public user: Usuarios = new Usuarios();
  public image;
  file: File;
  loading: HTMLIonLoadingElement;
  miId;

  public arregloChat: ChatUser[]= [];

  constructor(private usuarioService: UsuarioService,
              private angularFireStorage: AngularFireStorage,
              public loadingController: LoadingController,              
              private alertCtrt: AlertController,
              private router: Router,
              private chatService: ChatService,
              private mensajeErrorService: MensajeErrorService,
              ) { }

  ngOnInit() {
    this.miId = localStorage.getItem('userId')
    this.chatService.getChats().subscribe(res => {this.arregloChat =res;});
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res;});

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


  async UpdateUser(form):Promise<void>{
   // this.presentLoading("Espere por favor...");
    this.presentLoading("Espere por favor...");
    var telefono = form.value.telefono;
    if(telefono.length==10){
      telefono = '+593' + telefono.slice(1,telefono.length);
    }

    
    // if(this.file!='null'){
    //   this.guardarArchivo(telefono);
    // }
    // else{
    //  this.guardarArchivo(telefono);
      this.UpdateUserCompleto(telefono,this.image)
    // }
    
  }

  guardarArchivo(telefono: string){
    //this.presentLoading("Espere por favor...");
    
    var storageRef = this.angularFireStorage.storage.ref()

    
    storageRef.child(this.file.name).put(this.file)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {
                          this.UpdateUserCompleto(telefono, downloadURL)

                      
                        }
                    ).catch(err=>{this.loading.dismiss(), this.failedAlert("Error al cargar la foto de perfil, intentelo de nuevo")});
                    

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

 

  
  async UpdateUserCompleto(telefono: string, downloadURL:string){
  //  this.user.Telefono = telefono;
  //  this.user.FotoPerfil = downloadURL;
  //  var userId = localStorage.getItem('userId')
  //  this.usuarioService.updateUsuario(userId, this.user).
  //  then(
  //    auth=>{
  //      this.loading.dismiss();
  //      
  //      this.router.navigateByUrl("/perfil")     
  //  }  
  //  ).catch(async error => {
  //    this.loading.dismiss();
  //    var mensaje=error.code.split('/')[1];
  //    const presentarMensaje = this.mensajeErrorService.AuthErrorCodeSpanish(mensaje);
  //    this.failedAlert(presentarMensaje)
  //  })
  }


  async alertaDesactivar(){
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Deseas ocultar tu tarjerta en el chat?",
    buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: (data) => {
            this.desactivarChat()
            //this.router.navigate(['/crear-ayudantia']);
            
            //console.log('registrar')
          
          }
        }
      ]
    });
    await alert.present();

  }

  desactivarChat(){
    this.user.Citas = false
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user)

    for(let i=0; i< this.arregloChat.length; i++){
      if(this.arregloChat[i].user1 == this.miId || this.arregloChat[i].user2 == this.miId){
        this.arregloChat[i].Visibilidad = false
        this.chatService.updateChat(this.arregloChat[i].id, this.arregloChat[i])
      }
    }
    this.router.navigateByUrl("/perfil")

  }



}
