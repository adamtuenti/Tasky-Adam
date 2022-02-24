import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { ChatUser } from 'src/app/models/ChatUser';
import { ChatService } from 'src/app/services/chat.service';

import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';


import { FullScreenImage } from '@ionic-native/full-screen-image';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userName: String = "";
  message: String = "";
  // mensajes = [];

  name;
  uid;
  o_uid;
  texto = '';
  username;
  dp;

  idChat;
  chat;
  miId;
  idCompanero;
  mensajes: any = []
  companero: Usuarios = new Usuarios();
  bloqueo = false;
  miBloqueo = false;
  public vistazo = false;

  image;
  file: File;

  slideOpts = {
    zoom: {
      maxRatio: 2
    }

  }

  @ViewChild(IonContent) content: IonContent

  constructor(private activateRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private photoViewer: PhotoViewer,
              private alertCtrt: AlertController,
              public http: HttpClient,
              // private fullScreenImage: typeof FullScreenImage,
              private chatService: ChatService,) { 
    

  }

  ngOnInit() {

    


    this.activateRoute.paramMap.subscribe(paramMap => {
      this.idChat = paramMap.get('id');
      console.log('chat: '+paramMap.get('id'))
      this.idCompanero = paramMap.get('idCompanero');
      this.miId = localStorage.getItem('userId')
      // this.chatService.getChat(this.idChat).subscribe(res => {this.chat =res;this.validarVistos()});
      this.usuarioService.getUsuario(paramMap.get('idCompanero')).subscribe(res => {this.companero = res;console.log(this.companero)});

      firebase.firestore().collection('ChatUser').doc(paramMap.get('id')).onSnapshot(snap =>{
        this.chat = snap.data();
        //this.validarVistos()
          
      })

      this.http.post("http://localhost:3000/chat_id", {id: paramMap.get('id')})
      .subscribe(data => {
        console.log(data)
        this.mensajes = data
       }, error => {
        console.log(error);
      });
      

    /*  firebase.firestore().collection('ChatUser').doc(paramMap.get('id')).collection(paramMap.get('id')).orderBy('time').onSnapshot(snap =>{
        this.mensajes = [];
        snap.forEach(element => {
          this.mensajes.push(element.data())
          
        });
      })*/




    })

    

    

      // this.name = paramMap.get('name')
      // this.uid = paramMap.get('id')
      // this.o_uid = paramMap.get('id')
      // this.username = paramMap.get('username')

      // firebase.firestore().collection('Chat').get().then(userData => {
      //   this.mensajes = [];
      // userData.forEach(element => {
      //   console.log(element.data())

      //   //console.log(element.data().doc.id)
      //   if(element.data().uid == this.uid){
      //     this.mensajes.push(element.data())
      //   }
        
      //   });console.log(this.mensajes)
      // })

      
      
      

    
    // })
    
    this.getMensajes();
  }

  ampliar(codigo){
    this.photoViewer.show('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/wDNZuP3NYteNY5rczlDjwcN08/QVsu5GwiksbkgsCSSuqhQjDKG4ElmW9r2ygc6lrCIyWbSlKwMhSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAV1zQqwswBHQ1xSgNK2rOQxXQhb5cwDEerAmtm2Gg7NW+s6gsetr28h4DTU9TXFKAlaUpQH//Z');
  //   this.fullScreenImage.showImageBase64(codigo)
  //     .then((data: any) => console.log(data))
  //     .catch((error: any) => console.error(error));
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.image = reader.result;

        reader.readAsDataURL(this.file);
    }
  }

  

  validarVistos(){
    if(this.miId == this.chat.user1.id){
      this.chat.visto1 = true;
      if(this.chat.visto2){
        this.vistazo = true;
      }
      if(this.chat.bloqueo2){
        this.bloqueo = true;
      }
      if(this.chat.bloqueo1){
        this.miBloqueo = true;
      }

    }else{
      this.chat.visto2 = true;
      if(this.chat.visto1){
        this.vistazo = true;
      }
      if(this.chat.bloqueo1){
        this.bloqueo = true;
      }
      if(this.chat.bloqueo2){
        this.miBloqueo = true;
      }
    }

    this.chatService.updateChat(this.idChat,this.chat)
  }

  getMensajes(){
    this.http.post("http://localhost:3000/chat_id", {id: this.idChat})
          .subscribe(data => {
            console.log(data)
            this.mensajes = data
          }, error => {
            console.log(error);
    });
  }

  bloquearMensajes(){
    if(this.miId == this.chat.user1.id){
      this.chat.bloqueo1 = true;
    }else{
       this.chat.bloqueo2 = true;
    }
    this.chatService.updateChat(this.idChat,this.chat)

  }

  desbloquearMensajes(){
    if(this.miId == this.chat.user1.id){
      this.chat.bloqueo1 = false;
    }else{
       this.chat.bloqueo2 = false;
    }
    this.miBloqueo = false;
    this.chatService.updateChat(this.idChat,this.chat)
  }

  validarBloqueo(){
    if(this.miId == this.chat.user1){
      if(this.chat.bloqueo1){
        this.alertaDesbloquear()
      }else{
        this.alertaBloquear()
      }
     
    }else{
       if(this.chat.bloqueo2){
        this.alertaDesbloquear()
      }else{
        this.alertaBloquear()
      }
    }

    this.miBloqueo = true;

  }

  async alertaBloquear() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Deseas bloquear los mensajes de " + this.companero.Nombre + "?",
    buttons: [
        {
          text: 'Bloquear',
          cssClass: 'secondary',
          handler: (blah) => {
            this.bloquearMensajes()
            //console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  async alertaDesbloquear() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Deseas desbloquear los mensajes de " + this.companero.Nombre + "?",
    buttons: [
        {
          text: 'Desbloquear',
          cssClass: 'secondary',
          handler: (blah) => {
            this.desbloquearMensajes()
            //console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  validarEnvio(){
    if(this.bloqueo == false){
      this.send()
    }else{

    }

  }


  send(){

    const options = {
      headers: {
        'Content-Type': 'application/json',

      }
    };

    

    var fechaActual = new Date()
    console.log(this.idChat)

    let json = {
      idChat: this.idChat,
      fecha: fechaActual.toString(),
      mensaje: this.texto,
      time: Date.now(),
      emisor: this.miId,
      receptor: this.idCompanero

    }

    this.http.post("http://localhost:3000/enviar_mensaje", json, options)
      .subscribe(data => {
        this.texto = ''
        setTimeout(() => {
          this.content.scrollToBottom(200)
          
        });
       }, error => {
        console.log(error);
      });
    console.log(json)
/*
    if(this.texto != ''){
      console.log('aqui;' + this.texto)
      firebase.firestore().collection('ChatUser').doc(this.idChat).collection(this.idChat).add({
      fecha: fechaActual.toString(),
      id: this.miId,
      mensaje: this.texto,
      time: Date.now(),
      texto: true,

      }).then(() => {
        this.texto = ''
        setTimeout(() => {
          this.content.scrollToBottom(200)
          
        });
      })

    }
    if(this.image != null){
      firebase.firestore().collection('ChatUser').doc(this.idChat).collection(this.idChat).add({
      fecha: fechaActual.toString(),
      id: this.miId,
      mensaje: this.image,
      time: Date.now(),
      texto: false

      }).then(() => {
        this.image = null;
        setTimeout(() => {
          this.content.scrollToBottom(200)
          
        });
      })


    }

    

    

    
    this.chat.ultimoMensaje = Date.now();
    if(this.miId == this.chat.user1){
      this.chat.visto1 = true;
      this.chat.visto2 = false;
      this.vistazo = false;

    }else{
      this.chat.visto2 = true;
      this.chat.visto1 = false;
      this.vistazo = false;
    }
    this.chatService.updateChat(this.idChat,this.chat)

    */
    

  }

  // send(){

  //   // firebase.firestore().collection('ChatUser').doc(this.username).get().then(userData => {
  //   //   this.name = userData.data()['name'];
  //   //   this.username = userData.data()['username'];
  //   //   this.dp = userData.data()['dp'];
  //   // })



  //   // console.log('aqui')
  //   // console.log(this.uid)
  //   // console.log(this.texto)
  //   // console.log(Date.now())

  //   ;


  //   // firebase.firestore().collection('ChatUser').doc(this.uid).collection(this.o_uid).add({
  //   //   time: fechaActual.toString(),
  //   //   id: this.uid,
  //   //   mensaje: this.texto
  //   // })

  //   // firebase.firestore().collection('ChatUser').doc(this.o_uid).collection(this.uid).add({
  //   //   time: fechaActual.toString(),
  //   //   id: this.uid,
  //   //   mensaje: this.texto
  //   // }).then(() => {
  //   //   this.texto = ''
  //   // })

  //   // firebase.firestore().collection('ChatUser').doc(this.idChat).collection(this.idChat).add({
  //   //   time: fechaActual.toString(),
  //   //   id: this.idChat,
  //   //   mensaje: this.texto
  //   // })

  //   var fechaActual = new Date()

  //   firebase.firestore().collection('ChatUser').doc(this.idChat).collection(this.idChat).add({
  //     fecha: fechaActual.toString(),
  //     id: this.miId,
  //     mensaje: this.texto,
  //     time: Date.now()
  //   }).then(() => {
  //     this.texto = ''
  //   })



  //   this.chat.ultimoMensaje = Date.now();
  //   if(this.miId == this.chat.user1){
  //     this.chat.visto1 = true;
  //     this.chat.visto2 = false;
  //     this.vistazo = false;

  //   }else{
  //     this.chat.visto2 = true;
  //     this.chat.visto1 = false;
  //     this.vistazo = false;
  //   }
  //   this.chatService.updateChat(this.idChat,this.chat)
    

  // }

}
