import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionesMateria } from 'src/app/models/publicaciones-materia';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AyudantesService } from 'src/app/services/ayudantes.service';

@Component({
  selector: 'app-curso-detalle-anuncio',
  templateUrl: './curso-detalle-anuncio.page.html',
  styleUrls: ['./curso-detalle-anuncio.page.scss'],
})
export class CursoDetalleAnuncioPage implements OnInit {
  public user: Usuarios=new Usuarios();
  public publicacion: PublicacionesMateria=new PublicacionesMateria();

 
  nombreCurso: string;
  id:string;
  nombre:string;
  idEstudiante:string;

  constructor(private activateRoute: ActivatedRoute,
              private publicacionesService: PublicacionesService,
              private usuarioService: UsuarioService,
              private AyudantesService: AyudantesService) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      
      const idAnuncio = paramMap.get('id');
      this.id = idAnuncio;

      this.publicacionesService.getPublicacionMateria(idAnuncio).subscribe(res=>{this.publicacion = res;
      this.usuarioService.getUsuario(res.Estudiante).subscribe(res=> this.user = res);
      });
      
      //*ngIf="getUsuario(publicacion.Estudiante)"
     //this.actividadService.getActividad(idActividad).subscribe(res => this.actividad =res);
      
    });
    
    
  }

  


  

}
