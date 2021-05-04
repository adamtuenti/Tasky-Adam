import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosCollection: AngularFirestoreCollection <Usuarios>;
  private usuarios: Observable<Usuarios[]>;

  constructor(firestore: AngularFirestore) {
    this.usuariosCollection = firestore.collection('Usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
   }
  getUsuarios(){
    return this.usuarios;
  }
  
  getUsuario(id:string){
    return this.usuariosCollection.doc<Usuarios>(id).valueChanges();
  }

  addUsuario(id:string, Usuarios:Usuarios){
    return this.usuariosCollection.doc(id).set({...Usuarios});
  }

  updateUsuario(id:string, Usuarios:Usuarios){
    return this.usuariosCollection.doc(id).update({...Usuarios});
  }

  removeUsuario(id:string){
    return this.usuariosCollection.doc(id).delete();
 }
}