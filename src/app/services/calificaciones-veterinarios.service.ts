import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalificacionesVeterninarios } from '../models/calificacionesVeterinarios';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesVeterinariosService {

  private calificacionesCollection: AngularFirestoreCollection <CalificacionesVeterninarios>;
  private calificaciones: Observable<CalificacionesVeterninarios[]>;

  constructor(private firestore: AngularFirestore) {
    this.calificacionesCollection = firestore.collection('CalificacionesVeterinarios');
    this.calificaciones = this.calificacionesCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
   }
  getCalificaciones(){
    return this.calificaciones;
  }
  
  getCalificacion(id:string){
    return this.calificacionesCollection.doc<CalificacionesVeterninarios>(id).valueChanges();
  }

  addCalificacion(Calificaciones:CalificacionesVeterninarios){
    return this.calificacionesCollection.add({...Calificaciones});
  }

}