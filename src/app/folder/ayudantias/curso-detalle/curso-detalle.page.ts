import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { PublicacionesMateria } from 'src/app/models/publicaciones-materia';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Router } from '@angular/router';
// import { Ayudantes } from 'src/app/models/ayudantes';
// import { AyudantesService } from 'src/app/services/ayudantes.service';
// import { Cursos } from 'src/app/models/cursos';
// import { CursosService } from 'src/app/services/cursos.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.page.html',
  styleUrls: ['./curso-detalle.page.scss'],
})
export class CursoDetallePage implements OnInit {
  
  usuarios = [];
  usuario: Usuarios = new Usuarios();
  publicaciones = [];
  nombreCurso: string;
  id:string;
  cursos = [];
  nombre:string;
  idEstudiante:string;
  textoBuscar = '';
  // ayudantias:Ayudantes[]= [];
  cursosMisAyudantias = [];
  miId;  
  todosCursos = [];
  rol;

  condicionVacia = false;

  resultado = [];
  mostrarCita: string;
  constructor(private activateRoute: ActivatedRoute,
              private publicacionesService: PublicacionesService,
              private usuarioService: UsuarioService,
              private alertCtrt: AlertController,
              //private ayudanteService: AyudantesService,
              //private cursoService: CursosService,
              private router: Router,) { 
                
    
              }


  ngOnInit() {
    this.miId = localStorage.getItem('userId');
    // this.mostrarCita = localStorage.getItem('Citas')
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idCurso = paramMap.get('id');
      const nombreCurso = paramMap.get('nombre');
      this.nombreCurso= nombreCurso;
       this.id = idCurso;


      firebase.firestore().collection('Publicaciones').orderBy('Fecha').onSnapshot(snap =>{
      this.publicaciones = []
      snap.forEach(element => {
        if(element.data().Materia == paramMap.get('id')){
          this.publicaciones.push(element.data())
        }
        
      });
        if(this.publicaciones.length == 0){
          this.condicionVacia = true
        } 
      })
      // this.publicacionesService.getPublicacionesMateria().subscribe(res=> {this.publicaciones = res;this.condicionVacia = this.getDatos();});
   
    });


    firebase.firestore().collection('Ayudantes').where('Usuario','==',localStorage.getItem('userId')).onSnapshot(snap =>{
      this.cursosMisAyudantias = []
      snap.forEach(element => {
        this.cursosMisAyudantias.push(element.data().Materia)
      })
    })



    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.rol=res.Rol;});

    //this.ayudanteService.getAyudantes().subscribe(res => {this.ayudantias = res;this.listaCursos();});

    
    //this.usuarioService.getUsuarios().subscribe(res => {this.usuarios = res;});
  }


  // listaCursos(){
  //   for (let index = 0; index < this.ayudantias.length; index++) {
  //     if(this.ayudantias[index].Usuario == this.miId){
  //       this.cursosMisAyudantias.push(this.ayudantias[index].Materia)
  //     }
      

  //   }console.log(this.cursosMisAyudantias)
    
    

  // }

  validarCurso(){
    if(this.cursosMisAyudantias.includes(this.id)){
      if((this.usuario.Premium) || (this.usuario.Premium == false && this.usuario.Publicaciones < 5)){
     
      
        this.router.navigate(["/crear-publicacion",this.id])


      }else{
        this.failedAlertPremium();


      }

    
    }else{
        this.failedAlert();
      // this.router.navigate(['/crear-ayudantia'])
      // this.mostrarBoton = true;//redireccionar a la pagina
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





  getDatos(){
    for(let i= 0; i<this.publicaciones.length; i++){
      if(this.publicaciones[i].Materia == this.id){
        return false;
      }
    }
    return true;
  }

  aumentarVisita(id:string,publicacion:any){
    publicacion.Visitas= publicacion.Visitas + 1
    //console.log("fff", publicacion.Visitas)
    //[routerLink]="['/curso-detalle-anuncio',publicacion.id]"
    this.publicacionesService.updatePublicacionesMateria(id,publicacion)
    this.router.navigate(['/curso-detalle-anuncio',publicacion.id]);
      //console.log("ingreso")   
  }



  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }

  redireccionar(id){
    this.router.navigate(['/editar-publicacion',id,"Curso"])
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
        }, 
        {
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
