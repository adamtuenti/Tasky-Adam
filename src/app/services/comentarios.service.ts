import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comentarios } from '../models/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private ComentariosCollection: AngularFirestoreCollection <Comentarios>;
  private Comentarios: Observable<Comentarios[]>;

  constructor(firestore: AngularFirestore) {
    this.ComentariosCollection = firestore.collection('Comentarios',ref => ref.orderBy("Fecha", "desc"));
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
    return this.ComentariosCollection.doc<Comentarios>(id).valueChanges();
  }

  addComentario(Comentarios:Comentarios){
    return this.ComentariosCollection.add({...Comentarios});
  }

  removeComentario(id:string){
    return this.ComentariosCollection.doc(id).delete();
  }
    
}