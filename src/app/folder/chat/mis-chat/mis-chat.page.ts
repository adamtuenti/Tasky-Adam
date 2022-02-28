import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController} from '@ionic/angular'
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';



import { ChatUser } from 'src/app/models/ChatUser';
import { ChatService } from 'src/app/services/chat.service';



import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-mis-chat',
  templateUrl: './mis-chat.page.html',
  styleUrls: ['./mis-chat.page.scss'],
})
export class MisChatPage implements OnInit {

  uid;
  name;
  username;
  dp;
  users = [];
  miId;

  public arregloChat = [];
  public arregloUser = []
  public arregloId = []


  public usuarios: Usuarios[] = [];
  public idChats = [];
  public misChats: any = [];


  yalaChat: any = []

   yalaChat1: any = []
  puedoChat = []
  sinChat = false;


  



  veamos = []


  constructor(public nav: NavController,
              private usuarioService: UsuarioService,
              public http: HttpClient,
              private chatService: ChatService,) { 
    

    // var json = {user1: this.uid, user2: '0Ei0grQORYfs1LwhcIQe8wCaxCz2', nombre1: 'Adam', nombre2:'Miguel'}
    // firebase.firestore().collection('ChatUser').add({...json});


    // firebase.firestore().collection('ChatUser').doc(this.uid).get().then(userData => {
    //   this.name = userData.data()['name'];
    //   this.username = userData.data()['username'];
    //   this.dp = userData.data()['dp'];
    // })

    // firebase.firestore().collection('ChatUser').get().then(userData => {
    //   userData.forEach(element => {

    //     //console.log(element.data().doc.id)
    //     if(element.data().id == this.uid){
    //       this.users.push(element.data())
    //     }
        
    //   });console.log(this.users)
    // })

    
  }

  ngOnInit() {
    this.miId = localStorage.getItem('userId');
    this.uid = localStorage.getItem('userId');
    this.unaVez()
    //this.chatService.getChats().subscribe(res => {this.arregloChat =res;this.obtenerChats();});
    //this.usuarioService.getUsuarios().subscribe(res => {this.usuarios = res;});

    


    


  }

  unaVez(){
    // firebase.firestore().collection('Usuarios').where('Citas','==',true).onSnapshot(snap =>{
    //    this.arregloUser = [];
    //    this.arregloId = []
    //     snap.forEach(element => {
    //       this.arregloUser.push(element.data())
    //       this.arregloId.push(element.data().id)
    //     });
    //     console.log(this.arregloId)

    // })

    /* if(data[i].user1 == this.miId){
            console.log('aqui: ', data[i].user2)
            this.usuarioService.getUsuario(x.user2).subscribe(res => { this.yalaChat.push(res) });
            
          }
          else{
            this.usuarioService.getUsuario(x.user1).subscribe(res => {userTemp =res; console.log(res)});
          }*/

          console.log('mi id: ', this.miId)

   this.http.post("http://localhost:3000/chats_user", {id: this.miId})
      .subscribe(data => {
        this.misChats = data
      /*  if(data[0].length == 0){
          this.sinChat = true
        }*/
          
       }), error => {
        console.log(error);
      };

    
    


    
   /*firebase.firestore().collection('ChatUser').where('user2.id','==',localStorage.getItem('userId')).where('Visibilidad','==',true).onSnapshot(snap =>{

          snap.forEach(element => {
            var json = { id: element.id, user: element.data().user1, mensaje: element.data().ultimoMensaje}
            this.yalaChat.push(json)
          });


          firebase.firestore().collection('ChatUser').where('user1.id','==',localStorage.getItem('userId')).where('Visibilidad','==',true).onSnapshot(snap =>{

          snap.forEach(element => {
            var json = { id: element.id, user: element.data().user2, mensaje: element.data().ultimoMensaje}
            this.yalaChat.push(json)
          });if(this.yalaChat.length == 0){
            this.sinChat = true
          }
          //this.obtenerChats();
    })  




          //this.obtenerChats();
     })*/

    

  }

  

  goChat(uid,name){
    sessionStorage.setItem('uid',uid)
    sessionStorage.setItem('name',name)

    //console.log(uid+name)

    this.nav.navigateForward('/chat')

  }


  // obtenerChats(){

  //   for(let i =0; i < this.arregloChat.length; i++){
  //     //let userNuevo: Usuarios = new Usuarios();
  //     if(this.miId == this.arregloChat[i].user1){
  //       var ind = this.arregloId.indexOf(this.arregloChat[i].user2)
  //       // for(let n = 0;)
  //       //var json = {user: this.arregloChat[i].user2, id: this.arregloChat[i].id, Visibilidad: this.arregloChat[i].Visibilidad}
  //       var json = {user: this.arregloUser[ind], id: this.arregloChat[i].id, Visibilidad: this.arregloChat[i].Visibilidad}
  //       this.idChats.push(json)
  //      // this.usuarioService.getUsuario(this.arregloChat[i].user2).subscribe(res => {userNuevo =  res;this.misChats.push(userNuevo);});
  //     }

  //     if(this.miId == this.arregloChat[i].user2){
  //       var ind = this.arregloId.indexOf(this.arregloChat[i].user1)
  //       //console.log(this.arregloUser[ind])
  //       //var json = {user: this.arregloChat[i].user1, id: this.arregloChat[i].id, Visibilidad: this.arregloChat[i].Visibilidad}
  //       var json = {user: this.arregloUser[ind], id: this.arregloChat[i].id, Visibilidad: this.arregloChat[i].Visibilidad}
  //       this.idChats.push(json)
  //       //this.usuarioService.getUsuario(this.arregloChat[i].user1).subscribe(res => {userNuevo =  res;this.misChats.push(userNuevo);console.log(userNuevo)});
  //     } 
      
      
  //   }
    
  // }

  // obtenerUsuarios(){
  //   for(let i =0; i < this.idChats.length; i++){
  //     let userNuevo: Usuarios = new Usuarios();
  //     this.usuarioService.getUsuario(this.idChats[i]).subscribe(res => {userNuevo =  res;this.misChats.push(userNuevo);console.log(userNuevo)});

  //   }

  // }

}
