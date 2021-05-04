import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Adopcion } from 'src/app/models/adopcion';
import { AdopcionService } from 'src/app/services/adopcion.service';
@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.page.html',
  styleUrls: ['./adopcion.page.scss'],
})
export class AdopcionPage implements OnInit {
  adopciones: Adopcion[] = [];
  miId:string;
  textoBuscar='';
  opcionfiltro='';
  

  constructor(private activateRoute: ActivatedRoute,
    private adopcionService: AdopcionService,
    private alertCtrt: AlertController,
    private router: Router,) { }

  ngOnInit() {
    this.miId = localStorage.getItem('userId');
    this.adopcionService.getAdopciones().subscribe(res => this.adopciones = res)
  }

  getDatos(){    
    for(let i= 0; i<this.adopciones.length; i++){
      return false    
    }
      return true;
  }

  onChange(filtro:string){
    this.opcionfiltro=filtro
  }

  
  aumentarVisita(id:string,adopcion:Adopcion){
    adopcion.Visitas= adopcion.Visitas + 1
    //console.log("fff", publicacion.Visitas)
    //[routerLink]="['/curso-detalle-anuncio',publicacion.id]"
    this.adopcionService.updateAdopcion(id,adopcion)
      this.router.navigate(['/adopcion-detalle',adopcion.id,adopcion.Usuario]); 
  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }

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
        }, {
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
     this.adopcionService.removeAdopcion(id)
    
  }

}
