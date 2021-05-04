import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { ActivatedRoute } from '@angular/router';

import { Ayudantes } from 'src/app/models/ayudantes';
import { Calificaciones } from 'src/app/models/calificaciones';

import { UsuarioService } from 'src/app/services/usuario.service';
import { AyudantesService } from 'src/app/services/ayudantes.service';
import { CalificacionesService } from 'src/app/services/calificaciones.service';

//import {EmailComposer, EmailComposerOptions} from "@ionic-native/email-composer/ngx";

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.page.html',
  styleUrls: ['./usuario-detalle.page.scss'],
})




export class UsuarioDetallePage implements OnInit {


  usuario: Usuarios = new Usuarios();
  ayudantes: Ayudantes[]=[];
  calificaciones: Calificaciones[] = [];
  id:string;
  idMateria:string;
  myId:string;
  click:boolean;
  constructor(private activateRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private ayudantesService: AyudantesService,
              private calificacionesService: CalificacionesService,
              ) { }

  ngOnInit() {
    this.myId = localStorage.getItem('userId')
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idUsuario = paramMap.get('id');
      const idMateria = paramMap.get('idMateria');
      this.idMateria=idMateria;
      this.id = idUsuario;
      this.usuarioService.getUsuario(idUsuario).subscribe(res => {this.usuario = res;});
     // this.actividadService.getActividad(idActividad).subscribe(res => this.actividad =res);
    });


    this.ayudantesService.getAyudantes().subscribe(res => {this.ayudantes = res;});
    this.calificacionesService.getCalificaciones().subscribe(res => {this.calificaciones = res;this.controlar();});
    
  }

  like(){
   let  ayudante: Ayudantes = new Ayudantes();
    for (let index = 0; index < this.ayudantes.length; index++) {
      if((this.ayudantes[index].Materia == this.idMateria) && (this.ayudantes[index].Usuario == this.id)){
        ayudante= this.ayudantes[index]
        ayudante.Like=  ayudante.Like +1
        this.ayudantesService.updateAyudante(ayudante.id,ayudante)

        let calificacion: Calificaciones = new Calificaciones();
        calificacion.Ayudante= this.id;
        calificacion.Materia= this.idMateria;
        calificacion.Estudiante=this.myId;
        this.calificacionesService.addCalificacion(calificacion);
      }
      
    }
  this.click = true;
  //this.controlar();
   

  }

  dislike(){
   let  ayudante: Ayudantes = new Ayudantes();
    for (let index = 0; index < this.ayudantes.length; index++) {
      if((this.ayudantes[index].Materia == this.idMateria) && (this.ayudantes[index].Usuario == this.id)){
        ayudante= this.ayudantes[index]
        ayudante.Dislike=  ayudante.Dislike +1
        this.ayudantesService.updateAyudante(ayudante.id,ayudante)

        let calificacion: Calificaciones = new Calificaciones();
        calificacion.Ayudante= this.id;
        calificacion.Materia= this.idMateria;
        calificacion.Estudiante=this.myId;
        this.calificacionesService.addCalificacion(calificacion);
      }
      
    }
    this.click = true;
    //this.controlar();
   

  }


  controlar(){ 
    let validar = true;


    
    for (let index = 0; index < this.calificaciones.length; index++) {
      if((this.calificaciones[index].Materia == this.idMateria) && (this.calificaciones[index].Ayudante == this.id)&& (this.calificaciones[index].Estudiante == this.myId)){
        this.click = true;
        validar = false;
        
      }
    }

    if(validar){
      this.click = false;
    }

    
    
    // if (validar= false){
    //   this.click= true;
    //   if(num ==0){this.like()}
    //   if(num ==1){this.dislike()}
    // }

  }
}