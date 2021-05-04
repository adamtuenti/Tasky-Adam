import { Component, OnInit } from '@angular/core';
import { Ayudantes } from 'src/app/models/ayudantes';
import { Cursos } from 'src/app/models/cursos';
import { AyudantesService } from 'src/app/services/ayudantes.service';

import { CursosService } from 'src/app/services/cursos.service';

import { AlertController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-ayudantias',
  templateUrl: './mis-ayudantias.page.html',
  styleUrls: ['./mis-ayudantias.page.scss'],
})
export class MisAyudantiasPage implements OnInit {

  ayudantias:Ayudantes[]= [];
   usuario: Usuarios = new Usuarios();
  cursos:Cursos[]= [];
  id;
  textoBuscar='';

  constructor(private ayudanteService: AyudantesService,
    private alertCtrt: AlertController,
    private usuarioService: UsuarioService,         
    private router: Router,
    private cursosService: CursosService) { }

  ngOnInit() {
    this.usuarioService.getUsuario( localStorage.getItem('userId')).subscribe(res => this.usuario = res)
   

    this.id = localStorage.getItem("userId")
    this.ayudanteService.getAyudantes().subscribe(res => this.ayudantias = res);
    this.cursosService.getCursos().subscribe(res => this.cursos = res);
  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }
 
 


  async alert(id) {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Desea eliminar esta materia de sus ayudantias?",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
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
     this.ayudanteService.removeAyudante(id)
     this.usuario.Cursos =  this.usuario.Cursos - 1
     this.usuarioService.updateUsuario(this.id, this.usuario)
  }

   validarCurso(){
   
    if((this.usuario.Premium) || (this.usuario.Premium == false && this.usuario.Cursos < 2)){
      this.router.navigate(["/crear-ayudantia"])
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
     message: "Máximo puedes registrarte en 2 cursos.",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ser premium',
          handler: (data) => {
            this.serPremium()
            
            console.log('registrar')
          
          }
        }
      ]
    });
    await alert.present();
  }

  getDatos(){
    for(let i= 0; i<this.ayudantias.length; i++){
      if(this.ayudantias[i].Usuario == this.id){     
            return false;      
      }
    }
    return true;
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


  

}
