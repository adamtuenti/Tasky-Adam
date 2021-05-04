import { Component, OnInit } from '@angular/core';
import { Grupos } from 'src/app/models/grupos';
import { GruposService } from 'src/app/services/grupos.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Ayudantes } from 'src/app/models/ayudantes';
import { AyudantesService } from 'src/app/services/ayudantes.service';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  grupos: Grupos[]=[];
  textoBuscar='';
  miId;
  rol;
  idCurso;
  nombreCurso;
  id;
  ayudantias:Ayudantes[]= [];
  cursosMisAyudantias = [];
  condicionVacia = true;
  public user: Usuarios=new Usuarios();

  constructor(private grupoService: GruposService,
              private alertCtrt: AlertController,
              private activateRoute: ActivatedRoute,
              private ayudanteService: AyudantesService,
              private router: Router,
              private usuarioService: UsuarioService
              ) { }

  ngOnInit() {

    this.activateRoute.paramMap.subscribe(paramMap => {
      const idCurso = paramMap.get('id');
      const nombreCurso = paramMap.get('nombre');
      this.nombreCurso= nombreCurso;
     // const nombreCurso = paramMap.get('Nombre');
      this.id = idCurso;
     // this.nombre = nombreCurso;
      //this.actividadService.getActividad(idActividad).subscribe(res => this.actividad =res);
      
    });
    this.usuarioService.getUsuario(localStorage.getItem('userId')).subscribe(res => {this.user =res; this.rol= res.Rol; this.condicionVacia = this.getDatos();});
    this.grupoService.getGrupos().subscribe(res => this.grupos = res);
    this.ayudanteService.getAyudantes().subscribe(res => {this.ayudantias = res;this.listaCursos();});
    this.miId = localStorage.getItem('userId')
  }

  getDatos(){
    for(let i= 0; i<this.grupos.length; i++){
      if(this.grupos[i].Materia == this.id){     
            return false;      
      }
    }
    return true;
  }


  listaCursos(){
    for (let index = 0; index < this.ayudantias.length; index++) {
      if(this.ayudantias[index].Usuario == this.miId){
        this.cursosMisAyudantias.push(this.ayudantias[index].Materia)
      }
      
    }

  }
  redireccionar(id){
    this.router.navigate(["/editar-grupo",id])
  }

  buscar(event){
    const texto = event.target.value
    this.textoBuscar=texto;
  }

  validarCurso(){
    if(this.user.Premium){
      if(this.cursosMisAyudantias.includes(this.id)){
      // this.mostrarBoton = false;//mostrar mensaje.
      //  [routerLink]="['/crear-grupo',id]"
        this.router.navigate(["/crear-grupo",this.id])

      }
      else{
        this.failedAlert();
      // this.router.navigate(['/crear-ayudantia'])
      // this.mostrarBoton = true;//redireccionar a la pagina
      }

    }else{
      this.failedAlertPremium();


    }
    

  }

  async failedAlertPremium() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "Su cuenta no es premium",
     message: "No puede agregar cursos",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ser premium',
          handler: (data) => {
            this.serPremium()
            
            console.log('registrar')
          
          }
        }
      ]
    });
    await alert.present();
  }
  serPremium(){
    this.user.EsperaPremium = true;
    this.usuarioService.updateUsuario(localStorage.getItem('userId'),this.user)
      .then(res => {
        this.failedAlertPremiunMessage();
      });
  }
  async failedAlertPremiunMessage() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "Genial!",
     message: 'Pronto estaremos en contacto contigo por whatsapp!',
    buttons: [{
    text: 'OK',
      handler: () => {
        
      }
    }]   
    });
    await alert.present();
  }


  async failedAlert() {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "No estas registrado como ayudante en esta materia",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Registrar materia',
          handler: (data) => {
            this.router.navigate(['/crear-ayudantia']);
            
            console.log('registrar')
          
          }
        }
      ]
    });
    await alert.present();
  }

  
  async alert(id) {
    const alert = await this.alertCtrt.create({
     cssClass: 'my-custom-class',
     header: "¿Desea eliminar este grupo?",
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, 
        {
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
    this.grupoService.removeGrupo(id)
  }

}
