import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publicidad } from '../models/publicidad';


@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

    private publicidadCollection: AngularFirestoreCollection <Publicidad>;
    private publicidad: Observable<Publicidad[]>; //




   //private probar1: AngularFirestore <PublicacionesMateria>;

    constructor(firestore: AngularFirestore) {
      this.publicidadCollection = firestore.collection('Publicidad');

      //this.probar1 = firestore.collection('Publicaciones'.where("Visibilidad", "==", true).get();
      this.publicidad = this.publicidadCollection.snapshotChanges().pipe(map(
        actions =>{
          return actions.map( a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          })
        }
      ))




    }
    getPublicidad(){
      return this.publicidad;
    }

    getPublicidadId(id:string){
      return this.publicidadCollection.doc<Publicidad>(id).valueChanges();
    }

    updatePublicidad(id:string, Publicidad:Publicidad){
    return this.publicidadCollection.doc(id).update({...Publicidad});
  }
    
   




}
