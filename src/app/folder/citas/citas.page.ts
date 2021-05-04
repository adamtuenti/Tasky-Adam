import { Component, ViewChildren, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

import { esperaChat } from 'src/app/models/esperaChat';
import { EsperaChatService } from 'src/app/services/espera-chat.service';
import { AlertController } from '@ionic/angular';

import { ChatUser } from 'src/app/models/ChatUser';
import { ChatService } from 'src/app/services/chat.service';

import * as firebase from 'firebase';

import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})



export class CitasPage implements AfterViewInit {


  usuarios:Usuarios[] = [];
  citas = [];
  public user: Usuarios = new Usuarios();
  public chatEsperas: esperaChat[] = [];

  public arregloChat: ChatUser[]= [];
  public nuevoChat = []

  idEsperas = [];

  miId;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };


  usuariosGustos = []
  meDesean = []
  idDeseo = []
  meDeseanId = []

  longPressActive = false;
  vacio = false;

  people = [
    {
    name: 'Goku',
    img: 'https://sm.ign.com/t/ign_latam/screenshot/default/goku-susanoo_7by3.1200.jpg'
    },

    {
    name: 'Vegeta',
    img: 'https://depor.com/resizer/lzErRA9bNnXilyX-qkHh90byA3M=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/EZUULO3CDNESBLCGA65W3KWPZY.jpg'
    },
    {
    name: 'Freezer',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjgH1TPqQ7qz2KKp_HvHQGmK1wvklOyQmvN3zPd_Mz7QhuqrsRlbYy7zGqYDOE86Q7TvM&usqp=CAU'
    }
    
    ]

    



  
  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>

  constructor(private usuarioService: UsuarioService,
              private nativeAudio: NativeAudio,
              private alertCtrt: AlertController,
              private chatService: ChatService,
              private gestureCtrl: GestureController,
              private esperaService: EsperaChatService,
              private plt: Platform) { }

  ngOnInit() {

    
    
    
    
  }


  IonViewWillLeave(){
    this.nativeAudio.unload('audioWo')
  }



  play(){
    this.nativeAudio.play('audioWo')
  }


  ionViewWillEnter(){
    console.log('si')
    this.nativeAudio.preloadSimple('audioWo','assets/audio/mario-bros-here-we-go-hoo.mp3')
    this.miId = localStorage.getItem('userId')
    
    
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user = res;this.lesTengoGanas();});

    this.quierenConmigo()


   // this.usuarioService.getUsuarios().subscribe(res => {this.usuarios = res;this.shuffle(this.usuarios);this.conseguirChat();});
  }

  conseguirPersonas(){
    //conseguir personas que coincidan con tus gustos
    firebase.firestore().collection('Usuarios').where('Citas','==',true).where('Sexo','==',this.user.Busca).where('Busca','==',this.user.Sexo).onSnapshot(snap =>{
      this.usuariosGustos = []
      snap.forEach(element => {
  

        if(this.idDeseo.includes(element.data().id)){

        }else{
          if(element.data().id != localStorage.getItem('userId')){
            this.usuariosGustos.push(element.data())
          }
        }
      });

      if(this.usuariosGustos.length == 0){
        this.vacio = true
      }

    })
  }

  lesTengoGanas(){
    firebase.firestore().collection('ChatEspera').where('usuarioEnvio','==',localStorage.getItem('userId')).onSnapshot(snap =>{
      this.idDeseo = []
      snap.forEach(element => {
        this.idDeseo.push(element.data().esperaUsuario)
      });
      this.conseguirPersonas()
    })
  }


  quierenConmigo(){
    firebase.firestore().collection('ChatEspera').where('esperaUsuario','==',localStorage.getItem('userId')).onSnapshot(snap =>{
      this.meDeseanId = []
      this.meDesean = []
      snap.forEach(element => {
        this.meDeseanId.push(element.data().usuarioEnvio)
        this.meDesean.push(element.data())
      });
    })

  }

  after(){
    const cardArray = this.cards.toArray()
    this.swipeCard(cardArray)
  }

  
  ngAfterViewInit(){
    this.after()
    
  }


  vamosAVer(){
    const cardArray = this.cards.toArray()
    this.swipeCard(cardArray)
  }

  useLongPress(cardArray){
    for(let i = 0; i < cardArray.length; i ++){
      const card = cardArray[i]
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'long-press',
        onStart: ev => {
          this.longPressActive = true
          console.log('que pasa')
        },
        onEnd: ev => {
          this.longPressActive = false;
          console.log('ok')
        }
      });
      
      gesture.enable(true);

    }

  }

  swipeCard(cardArray){
    for(let i = 0; i < cardArray.length; i ++){
      const card = cardArray[i]
      //console.log(this.citas[i])
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe',
        onStart: ev => {
         
        },
        onEnd: ev => {
          card.nativeElement.style.transition = '.5s ease-out'
          this.setCardColor(ev.deltaX, card.nativeElement)

          if(ev.deltaX > 172){
            
            
            this.solicitarAmistad(true, this.usuariosGustos[i])
            card.nativeElement.style.transform = `translateX(${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
          }else if(ev.deltaX < -172){
            this.solicitarAmistad(false, this.usuariosGustos[i])//.id, this.citas[i].Nombre, this.citas[i])
            card.nativeElement.style.transform = `translateX(-${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
          }else{
            card.nativeElement.style.transform = ''
          }
          
        },
        onMove: ev => {
          this.setCardColor(ev.deltaX, card.nativeElement)
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        }
      });

      gesture.enable(true);

    }

  }

  setCardColor(x, element){
    console.log('llego')
    let color = ''
    const abs = Math.abs(x)
    const min = Math.trunc(Math.min(16*16 - abs, 16*16))
    const hexCode = this.decimalToHex(min,2)

    if(x <0){
      color = '#FF' + hexCode + hexCode
    }else{
      color = '#' + hexCode + 'FF' + hexCode
    }

    element.style.background = color;
  }

  decimalToHex(d, padding){
    let hex = Number(d).toString(16)
    padding = typeof padding === 'undefined' || padding == null ? (padding = 2) : padding
    while(hex.length < padding){
      hex = '0' + hex
    }
    return hex


  }

  // conseguirChat(){

  //   this.chatService.getChats().subscribe(res => {this.arregloChat =res;this.conseguirChatUser();});
  // }

  // conseguirEsperas(){
    
  //   for(let i = 0; i < this.chatEsperas.length; i++){
  //     if(this.chatEsperas[i].usuarioEnvio == this.miId){
  //       this.idEsperas.push(this.chatEsperas[i].esperaUsuario)
  //     }
  //   }
  // }

  // conseguirChatUser(){
  //   this.esperaService.getEsperas().subscribe(res => {this.chatEsperas = res;this.conseguirEsperas();}); //this.conseguirMatch()
    
  // }




  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }



  solicitarAmistad(boolean, cita){//userEnvio, nombre, cita){
    var valor = false;
    var yaEsta = false
    var like;

    console.log('prubea')
    console.log(cita.id)
    console.log(this.idDeseo)
    console.log('-')

    console.log('aver: '+cita.id)
    console.log(this.idDeseo)
    if(this.idDeseo.includes(cita.id)){
      yaEsta = true
      console.log('si esta')
    }
    console.log('me desea: '+cita.id)
    console.log(this.meDeseanId)


    if(this.meDeseanId.includes(cita.id)){
      valor = true;
      var ind = this.meDeseanId.indexOf(cita.id)
      like = this.meDesean[ind].like
    }


    // for(let i = 0; i < this.chatEsperas.length; i++){

    //   if(this.chatEsperas[i].usuarioEnvio == this.miId && this.chatEsperas[i].esperaUsuario == userEnvio){
    //     yaEsta = true
    //   }

    //   if(this.chatEsperas[i].esperaUsuario == this.miId){
    //     valor = true;
    //     like = this.chatEsperas[i].like
    //   }

    // }

    if(yaEsta == false){
      var json = {esperaUsuario: cita.id, usuarioEnvio: this.miId, like: boolean}
      this.esperaService.addEspera(json)
    }

    this.citas = this.citas.filter(function(item) { 
        return item !== cita
    })


    if(valor == true){
      if(like == true && boolean == true){
        this.amistad(cita.Nombre)
        this.nativeAudio.play('audioWo')
        this.validarChat(cita)
      }else{
        //console.log('no le gustas')
      }

    }

  }

  validarChat(userEnvio){

    var fechaActual = new Date();

    var json = {user1: userEnvio, user2: this.user, bloqueo1: false, bloqueo2: false, ultimoMensaje: -1, visto1: false, visto2: false, Visibilidad: true, timeMatch: Date.now(), fechaMatch: fechaActual.toString() }
    // this.nuevoChat.user1 = userEnvio;
    // this.nuevoChat.user2 = this.user;
    // this.nuevoChat.bloqueo1 = false;
    // this.nuevoChat.bloqueo2 = false;
    // this.nuevoChat.ultimoMensaje = -1;
    // this.nuevoChat.visto1 = false;
    // this.nuevoChat.visto2 = false;
    // this.nuevoChat.Visibilidad = true;

    var bool = false;


    // for(let i =0; i < this.arregloChat.length; i++){
    //     if( (this.miId == this.arregloChat[i].user1 && userEnvio == this.arregloChat[i].user2) || (this.miId == this.arregloChat[i].user2 && userEnvio == this.arregloChat[i].user1) ){
    //       bool = true;
    //     //this.chatActual = this.arregloChat[i]
    //     }      
    // }

    // if(bool == false){

      firebase.firestore().collection("ChatUser").add(json)
      // this.chatService.addChat(json).then(
      // //this.router.navigate(['/chat',this.nuevoChat.id, this.idCita])
      //  )
    // }


  }





  // conseguirMatch(){
  //   for(let i =0; i< this.usuarios.length; i++){
  //       if(this.usuarios[i].Citas == true && this.usuarios[i].Sexo == this.user.Busca && this.usuarios[i].Busca == this.user.Sexo){
  //         if(this.idEsperas.includes(this.usuarios[i].id)){
  //         }else{
  //           var json = {FotoPerfil: this.usuarios[i].FotoPerfil, Nombre: this.usuarios[i].Nombre, Apellido: this.usuarios[i].Apellido, id: this.usuarios[i].id}
  //           this.citas.push(json)
  //         }
  //     }
  //   }



  //}

  async amistad(nombre) {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "Ahora puedes chatear con " + nombre + '!!',
    buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        },

      ]
    });
    await alert.present();
  }

}
