import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComentariosVeterinarios } from '../models/comentariosVeterinario';
@Injectable({
  providedIn: 'root'
})
export class ComentariosVeterinariosService {

  private ComentariosCollection: AngularFirestoreCollection <ComentariosVeterinarios>;
  private Comentarios: Observable<ComentariosVeterinarios[]>;

  constructor(firestore: AngularFirestore) {
    this.ComentariosCollection = firestore.collection('ComentariosVeterinarios',ref => ref.orderBy("Fecha", "desc"));
    this.Comentarios = this.ComentariosCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
  }
  getComentarios(){
    return this.Comentarios;
  }
  
  getComentario(id:string){
    return this.ComentariosCollection.doc<ComentariosVeterinarios>(id).valueChanges();
  }

  addComentario(Comentarios:ComentariosVeterinarios){
    return this.ComentariosCollection.add({...Comentarios});
  }

  removeComentario(id:string){
    return this.ComentariosCollection.doc(id).delete();
  }
    
}