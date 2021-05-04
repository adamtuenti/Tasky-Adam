import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Sugerencias } from 'src/app/models/sugerenicas';
import {AngularFireStorage} from 'angularfire2/storage';
import { SugerenciaService } from 'src/app/services/sugerencia.service';
import { from } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.page.html',
  styleUrls: ['./sugerencias.page.scss'],
})
export class SugerenciasPage implements OnInit {
  public sugerencia: Sugerencias=new Sugerencias();
  telefono: string;
  constructor(private angularFireStorage: AngularFireStorage,
    private router: Router,
    private alertCtrt: AlertController,
    public loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private sugerenciaService: SugerenciaService) {
      this.usuarioService.getUsuario( localStorage.getItem('userId')).subscribe(res => { this.telefono=res.Rol})
     }

  ngOnInit() {
  }

  enviarSugerencia(form){
    this.sugerencia.Titulo = form.value.titulo;
    this.sugerencia.Detalle = form.value.descripcion;
    this.sugerencia.Visibilidad =true;
    this.sugerencia.Usuario = localStorage.getItem('userId')
    this.sugerencia.Telefono = this.telefono;
    this.sugerenciaService.addSugerencias(this.sugerencia)
      .then( res => {this.failedAlert()})
      .catch()
  }

  async failedAlert() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "Gracias por su sugerencia!",
    //  message: "Su sugerencia la tomaremos en cuenta en una nueva actualización.",
    buttons: [{
    text: 'OK',
      handler: () => {
        this.router.navigateByUrl("/perfil")
      }
    }]   
    });
    await alert.present();
  }
}
