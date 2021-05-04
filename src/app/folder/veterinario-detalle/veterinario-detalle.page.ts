import { Component, OnInit } from '@angular/core';
import { Veterinarios } from 'src/app/models/veterinarios';
import { VeterinariosService } from 'src/app/services/veterinarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalificacionesVeterninarios } from 'src/app/models/calificacionesVeterinarios';
import { CalificacionesVeterinariosService } from 'src/app/services/calificaciones-veterinarios.service';

@Component({
  selector: 'app-veterinario-detalle',
  templateUrl: './veterinario-detalle.page.html',
  styleUrls: ['./veterinario-detalle.page.scss'],
})
export class VeterinarioDetallePage implements OnInit {

  usuario: Veterinarios = new Veterinarios();
  calificaciones: CalificacionesVeterninarios[] = [];
  veterinarios: Veterinarios[]=[];
  id: string;
  click:boolean;
  myId:string;
  constructor(private activateRoute: ActivatedRoute,
    private veterinariosService: VeterinariosService,
    private calificacionesVeterinariosService: CalificacionesVeterinariosService,
    private alertCtrt: AlertController,
    private router: Router) { }

  ngOnInit() {
    
    this.myId = localStorage.getItem('userId')
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idUsuario = paramMap.get('id');
       this.id = idUsuario;
      this.veterinariosService.getUsuario(idUsuario).subscribe(res => {this.usuario = res;});
    });
    this.veterinariosService.getUsuarios().subscribe(res => {this.veterinarios = res;});
    this.calificacionesVeterinariosService.getCalificaciones().subscribe(res => {this.calificaciones = res;this.controlar();});
  
  }

  like(){
    let  veterinario: Veterinarios = new Veterinarios();
    for (let index = 0; index < this.veterinarios.length; index++) {
      if((this.veterinarios[index].id == this.id)){
        veterinario= this.veterinarios[index]
        veterinario.Like=  veterinario.Like +1
        this.veterinariosService.updateUsuario(veterinario.id,veterinario)
        let calificacion: CalificacionesVeterninarios = new CalificacionesVeterninarios();
        calificacion.Veterinario= this.id;
        calificacion.usuario=this.myId;
        this.calificacionesVeterinariosService.addCalificacion(calificacion);
     } 
    }
    this.click = true;
  }

  dislike(){
    let  veterinario: Veterinarios = new Veterinarios();
    for (let index = 0; index < this.veterinarios.length; index++) {
      if((this.veterinarios[index].id == this.id)){
        veterinario= this.veterinarios[index]
        veterinario.Dislike=  veterinario.Dislike +1
        this.veterinariosService.updateUsuario(veterinario.id,veterinario)
        let calificacion: CalificacionesVeterninarios = new CalificacionesVeterninarios();
        calificacion.Veterinario= this.id;
        calificacion.usuario=this.myId;
        this.calificacionesVeterinariosService.addCalificacion(calificacion);
     } 
    }
    this.click = true;
  }



  controlar(){ 
    let validar = true;
    for (let index = 0; index < this.calificaciones.length; index++) {
      if((this.calificaciones[index].Veterinario == this.id)&& (this.calificaciones[index].usuario == this.myId)){
        this.click = true;
        validar = false;    
      }
    }
    if(validar){
      this.click = false;
    }
  }
} 