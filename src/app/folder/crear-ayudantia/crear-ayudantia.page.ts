import { Component, OnInit } from '@angular/core';
import { Cursos } from 'src/app/models/cursos';
import { CursosService } from 'src/app/services/cursos.service';
import { Ayudantes } from 'src/app/models/ayudantes';
import { AyudantesService } from 'src/app/services/ayudantes.service';
import { Router } from '@angular/router';

import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-crear-ayudantia',
  templateUrl: './crear-ayudantia.page.html',
  styleUrls: ['./crear-ayudantia.page.scss'],
})
export class CrearAyudantiaPage implements OnInit {

  cursos: Cursos[]=[];
  miId; 
  ayudantias:Ayudantes[]= [];
  cursosMisAyudantias = [];
  todosCursos = [];
  nuevosCursos = [];
  usuario: Usuarios = new Usuarios();
  
  textoBuscar='';
  public nuevoAyudante: Ayudantes=new Ayudantes();

  constructor(private ayudanteService: AyudantesService,
              private cursoService: CursosService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.miId = localStorage.getItem('userId');
    this.usuarioService.getUsuario( localStorage.getItem('userId')).subscribe(res => this.usuario = res)
    this.ayudanteService.getAyudantes().subscribe(res => {this.ayudantias = res;this.listaCursos();this.getCursos()});
    
    
    

    
  }

  getCursos(){
    this.cursoService.getCursos().subscribe(res => {this.cursos = res;this.llenarCursos();this.nuevos()});
    
    
  }

  llenarCursos(){
    for (let index = 0; index < this.cursos.length; index++) {      
        this.todosCursos.push(this.cursos[index].id)    
    }
  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }

  nuevos(){

    for (let index = 0; index < this.todosCursos.length; index++) {
      
      if(this.cursosMisAyudantias.includes(this.todosCursos[index])){

      }
      else{
        this.nuevosCursos.push(this.todosCursos[index])
      }
    
      

    }
    //console.log('hola',this.nuevosCursos)

  }





  listaCursos(){
    for (let index = 0; index < this.ayudantias.length; index++) {
      if(this.ayudantias[index].Usuario == this.miId){
        this.cursosMisAyudantias.push(this.ayudantias[index].Materia)
      }
      

    }
    

  }




  crearAyudantia(idAyudantia:string){
    let data = {Visitas:0,Materia:idAyudantia,Usuario:this.miId}
    this.nuevoAyudante.Visitas = 0;
    this.nuevoAyudante.Materia = idAyudantia;
    this.nuevoAyudante.Usuario = this.miId;
    this.nuevoAyudante.Like = 0;
    this.nuevoAyudante.Dislike = 0;
    this.usuario.Cursos =  this.usuario.Cursos + 1
     this.usuarioService.updateUsuario(this.miId, this.usuario)

                

    this.ayudanteService.addAyudante(this.nuevoAyudante).then(
      auth=>{
        //this.loading.dismiss();
        this.router.navigateByUrl("/mis-ayudantias")
      }       
    ).catch(async error => {
     // this.loading.dismiss();
      //this.failedAlert("Algo salió mal, inténtelo de nuevo");
    })

  }
}
