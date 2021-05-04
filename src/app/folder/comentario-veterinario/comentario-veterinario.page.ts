import { Component, OnInit } from '@angular/core';
import { Veterinarios } from 'src/app/models/veterinarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/usuarios';
import { ComentariosVeterinarios } from 'src/app/models/comentariosVeterinario';
import { ComentariosVeterinariosService } from 'src/app/services/comentarios-veterinarios.service';

@Component({
  selector: 'app-comentario-veterinario',
  templateUrl: './comentario-veterinario.page.html',
  styleUrls: ['./comentario-veterinario.page.scss'],
})
export class ComentarioVeterinarioPage implements OnInit {
  usuarios:Usuarios[] = [];
  id: string;
  comentarios: ComentariosVeterinarios[]=[];
  public comentario: ComentariosVeterinarios=new ComentariosVeterinarios();
  miID: string;
  textoBuscar='';
  

  constructor(private activateRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private comentariosVeterinariosService : ComentariosVeterinariosService,
    private alertCtrt: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.miID = localStorage.getItem('userId')
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idUsuario = paramMap.get('id');
       this.id = idUsuario;
    });
    this.usuarioService.getUsuarios().subscribe(res => this.usuarios = res);
    this.comentariosVeterinariosService.getComentarios().subscribe(res =>this.comentarios = res);
    
  }

  getDatos(){
    for(let i= 0; i<this.comentarios.length; i++){
      if(this.comentarios[i].Veterinario == this.id){     
            return false;      
      }
    }
    return true;
  }

  async alert(id) {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Desea eliminar este comentario?",
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
    this.comentariosVeterinariosService.removeComentario(id)
  }

  async crearComentario() {

    const alert = await this.alertCtrt.create({
      cssClass: 'my-custom-class',
      header: 'Agregar comentario:',
      
      // message: 'Nombre del curso:',
      inputs: [
        {
          name: 'curso',
          placeholder: 'Comentario...',
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

  agregarSolitiud(comentario:string){
    var fechaActual = new Date();
    this.comentario.Veterinario = this.id;
    this.comentario.usuario = this.miID;
    this.comentario.Fecha = fechaActual.toString();
    this.comentario.Comentario = comentario;
    this.comentariosVeterinariosService.addComentario(this.comentario);

  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }

}
