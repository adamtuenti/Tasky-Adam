import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veterinarios } from 'src/app/models/veterinarios';
import { VeterinariosService } from 'src/app/services/veterinarios.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.page.html',
  styleUrls: ['./veterinarios.page.scss'],
})
export class VeterinariosPage implements OnInit {

  usuarios:Usuarios[] = [];
  veterinarios:Veterinarios[] = [];
  nombreCurso: string;
  id:string;
  nombre:string;
  miId;
  rol;
  desabilitar = false;

  condicionVacia = false;

  resultado = [];
  textoBuscar= '';
  constructor(private activateRoute: ActivatedRoute,
              private veterinariosService: VeterinariosService,
              private usuarioService: UsuarioService,
              private alertCtrt: AlertController,
              private router: Router) { }

  ngOnInit() {

    
      this.rol = localStorage.getItem('Rol')
      this.miId = localStorage.getItem('userId');


      this.veterinariosService.getUsuarios().subscribe(res => {this.veterinarios = res;this.condicionVacia = this.getDatos()});
      this.usuarioService.getUsuarios().subscribe(res => this.usuarios = res);
    
  }

  getDatos(){
    // this.ayudanteService.getAyudanteMateria(this.id).subscribe(res=> this.ayudantes = res);
    // console.log(this.ayudantes)

    for(let i= 0; i<this.veterinarios.length; i++){
      return false;       
    }
    return true;
  }

  aumentarVisita(id:string,veterinario:Veterinarios){
    veterinario.Visitas = veterinario.Visitas + 1
    //console.log("fff", publicacion.Visitas)
    //[routerLink]="['/curso-detalle-anuncio',publicacion.id]"
    this.veterinariosService.updateUsuario(id,veterinario)
   
    this.router.navigate(['/veterinario-detalle',id]);

  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }






 



  

 
}
