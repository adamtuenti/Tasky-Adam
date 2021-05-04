import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Grupos } from 'src/app/models/grupos';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { GruposService } from 'src/app/services/grupos.service';


@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.page.html',
  styleUrls: ['./crear-grupo.page.scss'],
})
export class CrearGrupoPage implements OnInit {

  grupo: Grupos = new Grupos();
  id:string;
  idGrupo:string;
  idMateria:string;
  idUser:string;
  myId:string;
  file: File;
  imageSrc;

  constructor(private activateRoute: ActivatedRoute,
              private grupoService: GruposService,
              private angularFireStorage: AngularFireStorage,
              private router: Router,
              ) { }

  ngOnInit() {
    this.myId = localStorage.getItem('userId')
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idMateria1 = paramMap.get('id');
      //const idU = paramMap.get('idUser')
      this.idMateria = idMateria1;
      this.idUser = localStorage.getItem('userId')
      //this.grupoService.getGrupo(idGrupo).subscribe(res => {this.grupo = res;});
     // this.actividadService.getActividad(idActividad).subscribe(res => this.actividad =res);
    });


  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file);
    }
  }

  async crearGrupo(form):Promise<void>{
    //this.presentLoading("Espere por favor...");
 
    
    
    this.guardarArchivo(form.value.nombre, form.value.descripcion,form.value.link);
  }

  guardarArchivo(nombre:string, descripcion:string, link:string){
    
    var storageRef = this.angularFireStorage.storage.ref()

    
    storageRef.child(this.file.name).put(this.file)
    .then(
            data=>{
                    data.ref.getDownloadURL().then(
                        downloadURL => {this.registroCompleto(nombre,descripcion,link,downloadURL)  
                          
                           
                      
                        }
                    ).catch(err=>{console.log('error')});
                    

            }
    )     


  }

  
  async registroCompleto(nombre:string,descripcion:string,link:string,downloadURL:string){
    this.grupo.Nombre = nombre
    this.grupo.Descripcion = descripcion
    this.grupo.Link = link
    this.grupo.Imagen = downloadURL
    this.grupo.Materia = this.idMateria;
    this.grupo.Usuario = this.myId;
    this.grupoService.addGrupo(this.grupo).
    then(
      auth=>{
        // this.loading.dismiss();
        
          this.router.navigate(["/grupos", this.idMateria,''])
       
       
      }  
    ).catch(async error => {
      // this.loading.dismiss();
      var mensaje=error.code.split('/')[1];
      //console.log('error')
      // const presentarMensaje = this.mensajeErrorService.AuthErrorCodeSpanish(mensaje);
      // this.failedAlert(presentarMensaje)
    })
  }

}
