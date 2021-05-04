import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Veterinarios } from '../models/veterinarios';

@Injectable({
  providedIn: 'root'
})
export class VeterinariosService {

  private usuariosCollection: AngularFirestoreCollection <Veterinarios>;
  private usuarios: Observable<Veterinarios[]>;

  constructor(firestore: AngularFirestore) {
    this.usuariosCollection = firestore.collection('Veterinarios');
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
    return this.usuariosCollection.doc<Veterinarios>(id).valueChanges();
  }

  addUsuario(id:string, Usuarios:Veterinarios){
    return this.usuariosCollection.doc(id).set({...Usuarios});
  }

  updateUsuario(id:string, Usuarios:Veterinarios){
    return this.usuariosCollection.doc(id).update({...Usuarios});
  }

  removeUsuario(id:string){
    return this.usuariosCollection.doc(id).delete();
 }
}