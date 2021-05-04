import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Anuncios } from '../models/anuncios';
// import firebase from 'firebase/app';
// import 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  private anunciosCollection: AngularFirestoreCollection <Anuncios>;
  private anuncios: Observable<Anuncios[]>;

  constructor(private firestore: AngularFirestore) {
    this.anunciosCollection = firestore.collection('Anuncios');
    this.anuncios = this.anunciosCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
   }
  getAnuncios(){
    return this.anuncios;
  }
  
  // getAyudante(id:string){
  //   return this.ayudantesCollection.doc<Ayudantes>(id).valueChanges();
  // }

  // addAyudante(Ayudantes:Ayudantes){
  //   return this.ayudantesCollection.add({...Ayudantes});
  // }

  updateAnuncio(id:string, Anuncios:Anuncios){
    return this.anunciosCollection.doc(id).update({...Anuncios});
  }

//   removeAyudante(id:string){
//     return this.ayudantesCollection.doc(id).delete();
//  }


//  getAyudanteMateria(materia:string){
//    return this.ayudantesCollection.snapshotChanges().where("Materia", "==", materia).get();
//  }


}