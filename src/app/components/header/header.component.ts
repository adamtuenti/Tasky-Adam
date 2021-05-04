import { Component, Input, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user: Usuarios=new Usuarios();
  estado;
  citas;


  text: string;
  @Input('nombre') nombre : string;
  showToolbar;
  segment = 'state';
  // FotoPerfil;

  constructor(private usuarioService: UsuarioService,
              ) { 
      this.showToolbar = false;
  }

  ngOnInit(){
    this.text = this.nombre;
    this.citas = localStorage.getItem('Citas')
    // this.FotoPerfil = localStorage.getItem('FotoPerfil')
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res;this.estado = res.Estado;});
  }

  ionViewWillEnter() {
    // timeout would be a http request in a real application 
    window.setTimeout(() => {
        this.showToolbar = true;
    }, 1000);
  }

}
