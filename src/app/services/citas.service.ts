import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Citas } from '../models/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private citasCollection: AngularFirestoreCollection <Citas>;
  private citas: Observable<Citas[]>;

  constructor(firestore: AngularFirestore) {
    this.citasCollection = firestore.collection('Citas');
    this.citas = this.citasCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
  }
  getCitas(){
    return this.citas;
  }
  
  getCita(id:string){
    return this.citasCollection.doc<Citas>(id).valueChanges();
  }
  addCita(Citas:Citas,id:string){
      return this.citasCollection.doc(id).set({...Citas});
    }

  
  
}
