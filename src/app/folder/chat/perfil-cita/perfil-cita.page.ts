import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ModalController, IonSlides } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';


import { ChatUser } from 'src/app/models/ChatUser';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-perfil-cita',
  templateUrl: './perfil-cita.page.html',
  styleUrls: ['./perfil-cita.page.scss'],
})
export class PerfilCitaPage implements OnInit {

  idCita;
  public edad;
  public cita: Usuarios=new Usuarios();
  miId;
  public arregloChat: ChatUser[]= [];
  public nuevoChat: ChatUser = new ChatUser();
  public chatActual: ChatUser = new ChatUser();



  slideOpts = {
    // initialSlide: 0,
    // speed: 400,
    zoom: {
      maxRatio: 2
    }
  };

  sliderOpts1 = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(private usuarioService: UsuarioService,
              private chatService: ChatService,
              private router: Router,
              private modalController: ModalController,
              private activateRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.miId = localStorage.getItem('userId')

    this.activateRoute.paramMap.subscribe(paramMap => {
      this.idCita = paramMap.get('idUser');
      this.chatService.getChats().subscribe(res => {this.arregloChat =res;});
      this.usuarioService.getUsuario(paramMap.get('idUser')).subscribe(res => {this.cita =res;this.calcularEdad()});
  
    });
  

  }

  // async openPreview(img) {
  //   const modal = await this.modalCtrl.create({
  //     component: ImageModalPage,
  //     cssClass: 'transparent-modal',
  //     componentProps: {
  //       img
  //     }
  //   });
  //   modal.present();
  // }

  calcularEdad(){
    const convertAge = new Date(this.cita.Nacimiento);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }


  validarChat(){

    this.nuevoChat.user1 = this.idCita;
    this.nuevoChat.user2 = this.miId;
    this.nuevoChat.bloqueo1 = false;
    this.nuevoChat.bloqueo2 = false;
    this.nuevoChat.ultimoMensaje = Date.now()
    this.nuevoChat.visto1 = false;
    this.nuevoChat.visto2 = false;
    this.nuevoChat.Visibilidad = true;

    


    var bool = false;
    for(let i =0; i < this.arregloChat.length; i++){
      if( (this.miId == this.arregloChat[i].user1 && this.idCita == this.arregloChat[i].user2) || (this.miId == this.arregloChat[i].user2 && this.idCita == this.arregloChat[i].user1) ){
        bool = true;
        this.chatActual = this.arregloChat[i]
      }
      
    }

    if(bool == false){
      this.chatService.addChat(this.nuevoChat).then(
        //this.router.navigate(['/chat',this.nuevoChat.id, this.idCita])
      )
    }


  }

}
