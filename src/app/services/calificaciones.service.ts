import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calificaciones } from '../models/calificaciones';
// import firebase from 'firebase/app';
// import 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  private calificacionesCollection: AngularFirestoreCollection <Calificaciones>;
  private calificaciones: Observable<Calificaciones[]>;

  constructor(private firestore: AngularFirestore) {
    this.calificacionesCollection = firestore.collection('Calificaciones');
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
    return this.calificacionesCollection.doc<Calificaciones>(id).valueChanges();
  }

  addCalificacion(Calificaciones:Calificaciones){
    return this.calificacionesCollection.add({...Calificaciones});
  }

//   updateAyudante(id:string, Ayudantes:Ayudantes){
//     return this.ayudantesCollection.doc(id).update({...Ayudantes});
//   }

//   removeAyudante(id:string){
//     return this.ayudantesCollection.doc(id).delete();
//  }


//  getAyudanteMateria(materia:string){
//    return this.ayudantesCollection.snapshotChanges().where("Materia", "==", materia).get();
//  }


}