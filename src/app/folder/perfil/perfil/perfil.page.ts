import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SMS } from '@ionic-native/sms/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


import { ChatUser } from 'src/app/models/ChatUser';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: Usuarios=new Usuarios();
  file: File;
  mostrarCita;
  miId;

  public arregloChat: ChatUser[]= [];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  usuarios:Usuarios[] = [];
  constructor(private usuarioService: UsuarioService,
              private alertCtrt: AlertController,
              private authService:AuthService,
              private sms: SMS,
              private chatService: ChatService,
              private router: Router,
              private emailComposer: EmailComposer
              ) { }

  ngOnInit() {
    this.miId = localStorage.getItem('userId')
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res;});
    this.mostrarCita = localStorage.getItem('Citas')
    this.usuarioService.getUsuarios().subscribe(res => {this.usuarios = res;});
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res;});
    this.chatService.getChats().subscribe(res => {this.arregloChat =res;});

  }

  logOutUser(){
    this.authService.logOutUser();
  }


  actualizarUser(){
    for(let i = 0; i < this.usuarios.length; i++){
      //this.usuarios[i].Foto2 = ''
      this.usuarios[i].Descripcion = ''
      this.usuarios[i].Busca = ''
      this.usuarios[i].Sexo = ''
      this.usuarios[i].Nacimiento = ''
      this.usuarioService.updateUsuario(this.usuarios[i].id, this.usuarios[i])
      //this.failedAlert2()
    }
  }

  validarCitas(){
    if(this.user.Citas){
      if(this.user.Descripcion != ''){
        this.router.navigateByUrl("/citas")
      }
      else{
        this.router.navigateByUrl("/previo-citas")
      }
      
    }else{
      if(this.user.Descripcion == ''){
        this.aparecerChat()
      }
      else{
        this.volverAparecerChat()

      }
      
    }
  }

  async volverAparecerChat() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Deseas volver a aparecer en el chat?",
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
            this.reActivarChat()
          }
        }
      ]
    });
    await alert.present();
  }

  async aparecerChat() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Deseas aparecer en el chat?",
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
            this.activarChat()
            //this.router.navigate(['/crear-ayudantia']);
            
            //console.log('registrar')
          
          }
        }
      ]
    });
    await alert.present();
  }


  activarChat(){
    this.user.Citas = true;
    console.log('hola')
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user)
    this.router.navigateByUrl("/previo-citas")
    // if(this.user.Descripcion == ''){
    //   this.router.navigateByUrl("/previo-citas")
    // }else{
    //   this.router.navigateByUrl("/citas")
    // }
  }

  reActivarChat(){
    this.user.Citas = true;
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user)


    /*for(let i=0; i< this.arregloChat.length; i++){
      if(this.arregloChat[i].user1 == this.miId || this.arregloChat[i].user2 == this.miId){
        this.arregloChat[i].Visibilidad = true
        console.log('aqui')
        this.chatService.updateChat(this.arregloChat[i].id, this.arregloChat[i])
      }
    }*/

    
    this.router.navigateByUrl("/citas")

  }
  




  serAyudante(){
    this.user.EsperaAyudantia = true;
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user)
      .then(res => {
        this.failedAlert();
      });
  }

  serPremium(){
    this.user.EsperaPremium = true;
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user)
      .then(res => {
        this.failedAlert();
      });
  }

  async failedAlert() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "Genial!",
     message: 'Pronto estaremos en contacto contigo por whatsapp!',
    buttons: [{
    text: 'OK',
      handler: () => {
        
      }
    }]   
    });
    await alert.present();
  }

  enviarMensaje(){
  //   this.sms.send('+593984870784', 'Hello world!').then(() => console.log('Success'))
  // .catch((reason: any) => console.log(reason));;


    let email = {
      to: 'adanavarrete15@gmail.com',
      cc: 'anavarrete15@gmail.com',
      bcc: [''],
      attachments: [
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        // 'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email);

  }


}