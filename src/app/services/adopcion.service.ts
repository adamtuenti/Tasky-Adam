import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Adopcion } from '../models/adopcion'

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  private AdopcionCollection: AngularFirestoreCollection <Adopcion>;
   private Adopcion: Observable<Adopcion[]>;

  constructor(firestore: AngularFirestore) {
    this.AdopcionCollection = firestore.collection('Adopcion',ref => ref.orderBy("Fecha", "desc"));
    this.Adopcion = this.AdopcionCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
  }
  getAdopciones(){
    return this.Adopcion;
  }
  
  getAdopcion(id:string){
    return this.AdopcionCollection.doc<Adopcion>(id).valueChanges();
  }

  addAdopcion(Adopcion:Adopcion){
    return this.AdopcionCollection.add({...Adopcion});
  } 

  updateAdopcion(id:string, Adopcion:Adopcion){
    return this.AdopcionCollection.doc(id).update({...Adopcion});
  }

  removeAdopcion(id:string){
    return this.AdopcionCollection.doc(id).delete();
  }
    
}