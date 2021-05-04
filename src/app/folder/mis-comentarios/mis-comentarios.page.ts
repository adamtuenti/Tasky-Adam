import { Component, OnInit } from '@angular/core';
import { Comentarios } from 'src/app/models/comentarios';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-comentarios',
  templateUrl: './mis-comentarios.page.html',
  styleUrls: ['./mis-comentarios.page.scss'],
})
export class MisComentariosPage implements OnInit {
  comentarios: Comentarios[]=[];
  public comentario: Comentarios=new Comentarios();
  textoBuscar='';
  idMateria: string;
  miID: string;
  usuarios:Usuarios[] = [];
  constructor(private activateRoute: ActivatedRoute,
              public comentariosService: ComentariosService,
              private usuarioService: UsuarioService,
              private alertCtrt: AlertController) { }

  ngOnInit() {
    this.miID = localStorage.getItem('userId')
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.idMateria = paramMap.get('idMateria');
     
    });
    this.usuarioService.getUsuarios().subscribe(res => this.usuarios = res);
    this.comentariosService.getComentarios().subscribe(res =>this.comentarios = res);
    
  }

  getDatos(){
    for(let i= 0; i<this.comentarios.length; i++){
      if(this.comentarios[i].Materia == this.idMateria && this.comentarios[i].Ayudante == this.miID){     
            return false;      
      }
    }
    return true;
  }

  
}