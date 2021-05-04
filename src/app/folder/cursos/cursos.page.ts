import { Component, OnInit } from '@angular/core';
import { Cursos } from 'src/app/models/cursos';
import { CursosService } from 'src/app/services/cursos.service';
import { AlertController } from '@ionic/angular';
import { MateriaSolicitud } from 'src/app/models/materia-solicitud';
import { MateriaSolicitudService } from 'src/app/services/materia-solicitud.service';
import { Anuncios } from 'src/app/models/anuncios';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  cursos: Cursos[]=[];
  public user: Usuarios=new Usuarios();
  textoBuscar='';
  userId;
  materia : MateriaSolicitud = new MateriaSolicitud();
  rol;
  anuncios: Anuncios[]=[];
  public anuncio: Anuncios=new Anuncios();

  mostrarCita;

  constructor(private cursoService: CursosService,
              private usuarioService: UsuarioService,
              public materiaService: MateriaSolicitudService,
              public anuncioService: AnunciosService,
              private alertCtrt: AlertController,
              private authService:AuthService) { }

  ngOnInit() {

    this.cursoService.getCursos().subscribe(res => this.cursos = res);
    this.userId = localStorage.getItem('userId')
    this.mostrarCita = localStorage.getItem('Citas')
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res;this.rol=res.Rol;this.getAnuncio();});
    
  }

  getAnuncio(){
    this.anuncioService.getAnuncios().subscribe(res=> {this.anuncios = res;this.validarPublicacion()});
  }

  validarPublicacion(){
    const valor = this.anuncios[0].Mostrar;
    this.anuncio = this.anuncios[0]
    //console.log('valor:',valor)
    //console.log(this.user.Anuncio)
    if(this.anuncios[0].Mostrar && this.user.Anuncio){
      this.failedAlert()
    }
  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
    //console.log(this.anuncios[0].Titulo)
  }

  

  async crearCurso() {

    const alert = await this.alertCtrt.create({
      cssClass: 'my-custom-class',
      header: 'Sugerir curso:',
      
      // message: 'Nombre del curso:',
      inputs: [
        {
          name: 'curso',
          placeholder: 'Nombre del curso',
          type: 'text'
          
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if(data.curso != ""){
              this.agregarSolitiud(data.curso)
            }else if(data.curso== ""){
              
              //this.failedAlert("El campo email es requerido");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  agregarSolitiud(curso:string){
    this.materia.Estado = true;
    this.materia.NombreMateria = curso;
    this.materia.Usuario = this.userId;
    this.materiaService.addMateria(this.materia);

  }

  aumentarAnuncio(){
    this.anuncio.Visitas = this.anuncio.Visitas + 1
    this.anuncioService.updateAnuncio(this.anuncio.id,this.anuncio)
    this.user.Anuncio = false;
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user)
  }

  async failedAlert() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: this.anuncios[0].Titulo,
     message: this.anuncios[0].Descripcion,
      buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.aumentarAnuncio();
              //console.log(blah)
              
            }
          }
        ]
      });
    await alert.present();
  }

  mensajeAlerta(){
    this.user.AyudantiaAceptada = false;
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user);
    this.authService.logOutUser();

  }

  // async ayudantiaAceptada() {
  //   if(this.user.AyudantiaAceptada){
  //     const alert = await this.alertCtrt.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Listo! Ya eres ayudante.',
  //     message: 'Porfavor, vuelve a iniciar sesión.',
  //       buttons: [
  //           {
  //             text: 'Cerrar sesión',
  //             role: 'Ok',
  //             cssClass: 'secondary',
  //             handler: (blah) => {
  //               this.mensajeAlerta();
                
  //               //console.log(blah)
                
  //             }
  //           }
          
  //         ]
  //       });
  //     await alert.present();
  //   }
    
  // }

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
            //this.remove(id)                  
          }
        }
      ]
    });
    await alert.present();
  }



}
