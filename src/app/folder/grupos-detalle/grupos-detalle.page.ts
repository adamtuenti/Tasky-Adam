import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { ActivatedRoute } from '@angular/router';

import { Grupos } from 'src/app/models/grupos';


import { GruposService } from 'src/app/services/grupos.service';


@Component({
  selector: 'app-grupos-detalle',
  templateUrl: './grupos-detalle.page.html',
  styleUrls: ['./grupos-detalle.page.scss'],
})
export class GruposDetallePage implements OnInit {

  grupo: Grupos = new Grupos();
  grupos: Grupos[]=[];
  id:string;
  idGrupo:string;
  myId:string;

  constructor(private activateRoute: ActivatedRoute,
              private grupoService: GruposService,
              ) { }

  ngOnInit() {
    this.myId = localStorage.getItem('userId')
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idGrupo = paramMap.get('id');
      this.id = idGrupo;
      this.grupoService.getGrupo(idGrupo).subscribe(res => {this.grupo = res;});
     // this.actividadService.getActividad(idActividad).subscribe(res => this.actividad =res);
    });


  }

  





}
