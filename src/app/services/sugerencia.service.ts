import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sugerencias } from '../models/sugerenicas';
// import firebase from 'firebase/app';
// import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {

  private sugerenciasCollection: AngularFirestoreCollection <Sugerencias>;
  private sugerencias: Observable<Sugerencias[]>;

  constructor(private firestore: AngularFirestore) {
    this.sugerenciasCollection = firestore.collection('Sugerencias');
    this.sugerencias = this.sugerenciasCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
   }
  getSugerencias(){
    return this.sugerencias;
  }
  
  getSugerencia(id:string){
    return this.sugerenciasCollection.doc<Sugerencias>(id).valueChanges();
  }

  addSugerencias(Sugerencias:Sugerencias){
    return this.sugerenciasCollection.add({...Sugerencias});
  }

  updateSugerencias(id:string, Sugerencias:Sugerencias){
    return this.sugerenciasCollection.doc(id).update({...Sugerencias});
  }

  removeSugerencias(id:string){
    return this.sugerenciasCollection.doc(id).delete();
 }





}