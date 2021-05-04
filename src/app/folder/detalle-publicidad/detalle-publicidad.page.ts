import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicidad } from 'src/app/models/publicidad';
import { PublicidadService } from 'src/app/services/publicidad.service';


@Component({
  selector: 'app-detalle-publicidad',
  templateUrl: './detalle-publicidad.page.html',
  styleUrls: ['./detalle-publicidad.page.scss'],
})
export class DetallePublicidadPage implements OnInit {

  id:string;
  public detalle: Publicidad = new Publicidad();

  constructor(private activateRoute: ActivatedRoute,
              private publicidadService: PublicidadService) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      
      const idPublicidad = paramMap.get('id');
      this.id = idPublicidad;

      this.publicidadService.getPublicidadId(idPublicidad).subscribe(res=>{this.detalle = res});
      });    
    
  }

}
