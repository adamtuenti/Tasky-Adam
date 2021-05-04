import { Component, OnInit } from '@angular/core';
// import { PublicacionesMateria } from 'src/app/models/publicaciones-materia';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Publicidad } from 'src/app/models/publicidad';
import { PublicidadService } from 'src/app/services/publicidad.service';
import * as firebase from 'firebase';



@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  usuario: Usuarios = new Usuarios();
  publicaciones = [];
  nombreCurso: string;
  miId:string;
  rol;
  textoBuscar='';
  publicidad: Publicidad[] = [];

  mostrarCita;

  public user: Usuarios=new Usuarios();
  //probar: PublicacionesMateria[] = [];
 
  constructor(private activateRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private publicacionesService: PublicacionesService,
              private alertCtrt: AlertController,
              private router: Router,
              private publicidadService: PublicidadService,
              ) {
            }

  ngOnInit() {
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res;this.rol=res.Rol});
    this.miId = localStorage.getItem('userId');

    firebase.firestore().collection('Publicaciones').orderBy('Fecha').limit(15).onSnapshot(snap =>{
        this.publicaciones = [];
        snap.forEach(element => {
          this.publicaciones.push(element.data())
          
        });
    })

    
        
    

    //this.publicacionesService.getPublicacionesMateria().subscribe(res=> this.publicaciones = res);
    this.publicidadService.getPublicidad().subscribe(res=> {this.publicidad = res;this.shuffle(this.publicidad)});
    //this.publicacionesService.probar().subscribe(res=>this.probar = res);
 
    
  }


  redireccionar(id){
    this.router.navigate(['/editar-publicacion',id,"Publicacion"])
  }

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


  getDatos(){    
    for(let i= 0; i<this.publicaciones.length; i++){
      return false    
    }
      return true;
  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }

  aumentarVisita(id:string,publicacion:any){
    publicacion.Visitas= publicacion.Visitas + 1
    //console.log("fff", publicacion.Visitas)
    //[routerLink]="['/curso-detalle-anuncio',publicacion.id]"
    this.publicacionesService.updatePublicacionesMateria(id,publicacion)
    this.router.navigate(['/curso-detalle-anuncio',publicacion.id]); 
  }

  // aumentarVisitaPublicidad(id:string,publicidad:Publicidad){
  //   publicidad.Visitas= publicidad.Visitas + 1
  //   //console.log("fff", publicidad.Visitas)
  //   //[routerLink]="['/detalle-publicidad',publicacion.id]"
  //   this.publicidadService.updatePublicidad(id,publicidad)
  //   this.router.navigate(['/detalle-publicidad',publicidad.id]); 
  // }

  validarCurso(){
    if(this.usuario.Rol == 'Estudiante'){
      this.router.navigate(["/crear-publicacion-todos"])
    }

    else if((this.usuario.Premium) || (this.usuario.Premium == false && this.usuario.Publicaciones < 5)){
      this.router.navigate(["/crear-publicacion-todos"])
      // this.mostrarBoton = false;//mostrar mensaje.
      //  [routerLink]="['/crear-grupo',id]"
        
      


    }else{
      this.failedAlertPremium();


    }

    
  

  }

  async failedAlertPremium() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "Su cuenta no es premium",
     message: "Máximo puedes realizar 5 publicaciones",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ser premium',
          handler: (data) => {
            this.serPremium()
            
            //console.log('registrar')
          
          }
        }
      ]
    });
    await alert.present();
  }
  serPremium(){
    this.usuario.EsperaPremium = true;
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.usuario)
      .then(res => {
        this.failedAlertPremiunMessage();
      });
  }
  async failedAlertPremiunMessage() {
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


  

  async alert(id) {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Desea eliminar esta publicación?",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Elminar',
          handler: (data) => {
            this.remove(id)                  
          }
        }
      ]
    });
    await alert.present();
  }
  remove(id){
     this.publicacionesService.removePublicacionesMateria(id)
     this.usuario.Publicaciones = this.usuario.Publicaciones - 1;
     this.usuarioService.updateUsuario(this.miId,this.usuario)
  }

}