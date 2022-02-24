import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adopcion } from 'src/app/models/adopcion';
import { Usuarios } from 'src/app/models/usuarios';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-adopcion-detalle',
  templateUrl: './adopcion-detalle.page.html',
  styleUrls: ['./adopcion-detalle.page.scss'],
})
export class AdopcionDetallePage implements OnInit {
  public user: Usuarios=new Usuarios();
  public adopcion: Adopcion=new Adopcion();
 
  constructor(private activateRoute: ActivatedRoute,
    private adopcionService: AdopcionService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {   
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idUser = paramMap.get('idUsuario');
      const id = paramMap.get('id');
      this.adopcionService.getAdopcion(id).subscribe(res=>this.adopcion = res);
      this.usuarioService.getUsuario(idUser).subscribe(res=> this.user = res);  
    });
  }

}
 