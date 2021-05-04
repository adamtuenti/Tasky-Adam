import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ayudantes } from 'src/app/models/ayudantes';
import { AyudantesService } from 'src/app/services/ayudantes.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-curso-ayudantes',
  templateUrl: './curso-ayudantes.page.html',
  styleUrls: ['./curso-ayudantes.page.scss'],
})
export class CursoAyudantesPage implements OnInit {

  usuarios:Usuarios[] = [];
  ayudantes = [];
  nombreCurso: string;
  id:string;
  nombre:string;
  ayudantias = [];
  cursosMisAyudantias = [];
  miId;
  rol;
  desabilitar = false;
  condicionVacia = false;

  resultado = [];
  textoBuscar= '';
  constructor(private activateRoute: ActivatedRoute,
              private ayudanteService: AyudantesService,
              private usuarioService: UsuarioService,
              private alertCtrt: AlertController,
              private router: Router) {
                
    
               }

  ngOnInit() {

    this.activateRoute.paramMap.subscribe(paramMap => {
      //console.log(paramMap)
      this.miId = localStorage.getItem('userId');
      const idCurso = paramMap.get('id');
      const nombreCurso = paramMap.get('nombre');
      this.nombreCurso= nombreCurso;
      this.id = idCurso;

      
    })


      
      
  
    

    this.conseguirDatos()

    

   // this.ayudanteService.getAyudantes().subscribe(res=> {this.ayudantes = res;this.shuffle(this.ayudantes);this.validarCurso()});
    this.usuarioService.getUsuarios().subscribe(res => {this.usuarios = res;});
    this.usuarioService.getUsuario( localStorage.getItem('userId')).subscribe(res => {this.rol=res.Rol;});
    
  }

  conseguirDatos(){
    firebase.firestore().collection('Ayudantes').where('Materia','==',this.id).onSnapshot(snap =>{
      this.ayudantes = []
        snap.forEach(element => {
          this.ayudantes.push(element.data())
        })
        if(this.ayudantes.length == 0){
          this.condicionVacia = true
        }
        this.shuffle(this.ayudantes);
        this.ayudantes = this.ayudantes.slice(0,10)
    })

    firebase.firestore().collection('Ayudantes').where('Usuario','==',localStorage.getItem('userId')).onSnapshot(snap =>{
      this.cursosMisAyudantias = []
      snap.forEach(element => {
        if(element.data().Materia == this.id){
          this.desabilitar = true
        }
        this.cursosMisAyudantias.push(element.data().Materia)
      })
    });
  }

  // getDatos(){

  //   for(let i= 0; i<this.ayudantes.length; i++){
  //     if(this.ayudantes[i].Materia == this.id){
  //       for(let j= 0; j<this.usuarios.length; j++){
  //         if(this.usuarios[j].id == this.ayudantes[i].Usuario){
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   return true;
  // }

  aumentarVisita(id:string,ayudante:any){
    ayudante.Visitas= ayudante.Visitas + 1
    this.ayudanteService.updateAyudante(id,ayudante)
    this.router.navigate(['/usuario-detalle',this.id,ayudante.Usuario]);

  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }

  listaCursos(){
    for (let index = 0; index < this.ayudantias.length; index++) {
      if(this.ayudantias[index].Usuario == this.miId){
        this.cursosMisAyudantias.push(this.ayudantias[index].Materia)
      }
      

    }
    
    

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



  validarCurso(){

    var numero = 0

    for (let index = 0; index < this.ayudantes.length; index++) {
      if(this.ayudantes[index].Usuario == this.miId && this.id == this.ayudantes[index].Materia){
        numero = numero + 1
       // return true
       // break;
       
      
      }
    }
    console.log(numero)
    if(numero==0){
      this.desabilitar = false;
    }
    else{
      this.desabilitar = true;
    }
     //this.failedAlert();
   // console.log("no existo")
   // return false;

  }

  agregarCurso(){

  }

  
  async failedAlert() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "No estas registrado como ayudante en esta materia",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Registrar materia',
          handler: (data) => {
            this.router.navigate(['/crear-ayudantia']);
            
            //console.log('registrar')
          
          }
        }
      ]
    });
    await alert.present();
  }
 
}
