import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ayudantes } from '../models/ayudantes';
// import firebase from 'firebase/app';
// import 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class AyudantesService {

  private ayudantesCollection: AngularFirestoreCollection <Ayudantes>;
  private ayudantes: Observable<Ayudantes[]>;

  constructor(private firestore: AngularFirestore) {
    this.ayudantesCollection = firestore.collection('Ayudantes');
    this.ayudantes = this.ayudantesCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
   }
  getAyudantes(){
    return this.ayudantes;
  }
  
  getAyudante(id:string){
    return this.ayudantesCollection.doc<Ayudantes>(id).valueChanges();
  }

  addAyudante(Ayudantes:Ayudantes){
    return this.ayudantesCollection.add({...Ayudantes});
  }

  updateAyudante(id:string, Ayudantes:Ayudantes){
    return this.ayudantesCollection.doc(id).update({...Ayudantes});
  }

  removeAyudante(id:string){
    return this.ayudantesCollection.doc(id).delete();
 }


//  getAyudanteMateria(materia:string){
//    return this.ayudantesCollection.snapshotChanges().where("Materia", "==", materia).get();
//  }


}