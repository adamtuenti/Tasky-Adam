import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { esperaChat } from '../models/esperaChat';

@Injectable({
  providedIn: 'root'
})
export class EsperaChatService {

    private esperaCollection: AngularFirestoreCollection <esperaChat>;
    private esperas: Observable<esperaChat[]>;

    constructor(firestore: AngularFirestore) {
      this.esperaCollection = firestore.collection('ChatEspera');
      this.esperas = this.esperaCollection.snapshotChanges().pipe(map(
        actions =>{
          return actions.map( a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          })
        }
      ))
    }
    getEsperas(){
      return this.esperas;
    }
    
    // getGrupo(id:string){
    //   return this.gruposCollection.doc<Grupos>(id).valueChanges();
    // }

    addEspera(esperaChat:esperaChat){
      return this.esperaCollection.add({...esperaChat});
    }
}
