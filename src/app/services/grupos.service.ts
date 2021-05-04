import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Grupos } from '../models/grupos';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

    private gruposCollection: AngularFirestoreCollection <Grupos>;
    private grupos: Observable<Grupos[]>;

    constructor(firestore: AngularFirestore) {
      this.gruposCollection = firestore.collection('Grupos');
      this.grupos = this.gruposCollection.snapshotChanges().pipe(map(
        actions =>{
          return actions.map( a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          })
        }
      ))
    }
    getGrupos(){
      return this.grupos;
    }
    
    getGrupo(id:string){
      return this.gruposCollection.doc<Grupos>(id).valueChanges();
    }

    addGrupo(Grupos:Grupos){
      return this.gruposCollection.add({...Grupos});
    }

     updateGrupo(id:string, Grupos:Grupos){
      return this.gruposCollection.doc(id).update({...Grupos});
    }
  
    removeGrupo(id:string){
      return this.gruposCollection.doc(id).delete();
   }




}