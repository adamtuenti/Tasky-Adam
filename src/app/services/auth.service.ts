import { Injectable } from '@angular/core';
import { FirebaseAuth } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { rejects } from 'assert';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private firestore: AngularFirestore,
              private usuarioService: UsuarioService) { }
  loginUser(email:string, password:string):Promise<firebase.auth.UserCredential>{
    
    return new Promise ((resolve, reject)=>{ 
      firebase.auth().signInWithEmailAndPassword(email, password).then( res=>{ 
        localStorage.setItem('email', email);
        localStorage.setItem('userId', res.user.uid);

        this.usuarioService.getUsuario(res.user.uid).subscribe(res => {
          localStorage.setItem('Rol',res.Rol);
          localStorage.setItem('Estado',res.Estado);
        
        });

      resolve(res);   
      }).catch(err => reject(err))
    })
  }

  signupnUser(email:string, password:string,nombre:string, apellido:string, matricula: string, telefono: string, fotoCarnet: string):Promise<any>{
    
    return new Promise ((resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(email, password).then( res=>{ 
        localStorage.setItem('userId', res.user.uid);
        localStorage.setItem('email', email);
        localStorage.setItem('Rol','Estudiante');
        localStorage.setItem('Estado','P');
        localStorage.setItem('Citas','No')
        
        
      
        this.firestore.collection('Usuarios').doc(res.user.uid).set({
          id: res.user.uid,
          Apellido: apellido,
          Correo: email,
          FotoPerfil: 'https://firebasestorage.googleapis.com/v0/b/taskyapp01.appspot.com/o/iconos%2FperfilIcono.png?alt=media&token=60ae62b9-02ed-4993-9b76-dc9915992e4c',
          Foto2: '',
          Foto: fotoCarnet,
          Matricula: matricula,
          Nombre: nombre,
          Premium: false,
          Publicaciones: 0,
          Rol: 'Estudiante',
          Telefono: telefono,
          Universidad: 'Espol',
          Anuncio: true,
          EsperaAyudantia: false,
          EsperaPremium: false,
          Cursos:0,
         // Verificacion: false,
          Estado: 'P',
          AyudantiaAceptada: false,
          Citas: false,

          Descripcion: '',
          Busca: '',
          Sexo: '',
          Nacimiento: ''

        });
    
       


      resolve(res);
         
      }).catch(err => reject(err))
    });  
  }

  resetPassword(email:string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutUser(){
     firebase.auth().signOut().then(
      ()=> 
      (localStorage.clear(),
      this.router.navigateByUrl("/login"))
    );
  }

}