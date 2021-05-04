import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Grupos } from 'src/app/models/grupos';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { GruposService } from 'src/app/services/grupos.service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.page.html',
  styleUrls: ['./editar-grupo.page.scss'],
})
export class EditarGrupoPage implements OnInit {
  grupo: Grupos = new Grupos();
  id:string;
  idGrupo:string;
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
    this.activateRoute.paramMap.subscribe(paramMap => {
      const idGrupo = paramMap.get('id');
      this.idGrupo = idGrupo;
      this.idUser = localStorage.getItem('userId')
      this.grupoService.getGrupo(idGrupo).subscribe(res => {this.grupo = res;});
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
    if (this.file != null){
      this.guardarArchivo(form.value.nombre, form.value.descripcion,form.value.link);
    } else{
      this.registroCompleto(form.value.nombre, form.value.descripcion,form.value.link,null);
    }


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
    console.log(downloadURL)
    if (downloadURL != null){
      this.grupo.Imagen = downloadURL
    }
    this.grupoService.updateGrupo(this.idGrupo, this.grupo).
    then(
      auth=>{
          this.router.navigate(["/grupos", this.grupo.Materia,''])
         
      }  
    ).catch(async error => {
      // this.loading.dismiss();
      var mensaje=error.code.split('/')[1];
      console.log('error')
      // const presentarMensaje = this.mensajeErrorService.AuthErrorCodeSpanish(mensaje);
      // this.failedAlert(presentarMensaje)
    })
  }

  

}
