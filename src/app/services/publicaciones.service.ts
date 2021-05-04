import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publicaciones } from '../models/publicaciones';
import { PublicacionesMateria } from '../models/publicaciones-materia';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

    private publicacionesCollection: AngularFirestoreCollection <Publicaciones>;
    private publicaciones: Observable<Publicaciones[]>;


    private publicacionesMateriaCollection: AngularFirestoreCollection <PublicacionesMateria>;
    private publicacionesMateria: Observable<PublicacionesMateria[]>;

   //private probar1: AngularFirestore <PublicacionesMateria>;

    constructor(firestore: AngularFirestore) {
      this.publicacionesCollection = firestore.collection('PublicacionesGenerales');

      //this.probar1 = firestore.collection('Publicaciones'.where("Visibilidad", "==", true).get();
      this.publicaciones = this.publicacionesCollection.snapshotChanges().pipe(map(
        actions =>{
          return actions.map( a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          })
        }
      ))



      this.publicacionesMateriaCollection = firestore.collection('Publicaciones',ref => ref.orderBy("Fecha", "asc"));
      this.publicacionesMateria = this.publicacionesMateriaCollection.snapshotChanges().pipe(map(
        actions =>{
          return actions.map( a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          })
        }
      ))


    }
    getPublicaciones(){
      return this.publicaciones;
    }
    
    getPublicacion(id:string){
      return this.publicacionesCollection.doc<Publicaciones>(id).valueChanges();
    }

    addPublicaciones( Usuarios:Publicaciones){
      return this.publicacionesCollection.add({...Usuarios});
    }
  
    updatePublicaciones(id:string, Usuarios:Publicaciones){
      return this.publicacionesCollection.doc(id).update({...Usuarios});
    }
  
    removePublicaciones(id:string){
      return this.publicacionesCollection.doc(id).delete();
    }

    // probar(){
    //   return this.probar1;
    // }




    getPublicacionesMateria(){
      return this.publicacionesMateria;
    }
    getPublicacionMateria(id:string){
      return this.publicacionesMateriaCollection.doc<PublicacionesMateria>(id).valueChanges();
    }

    addPublicacionesMateria( PublicacionesMateria:PublicacionesMateria){
      return this.publicacionesMateriaCollection.add({...PublicacionesMateria});
    }
  
    updatePublicacionesMateria(id:string, PublicacionesMateria:PublicacionesMateria){
      return this.publicacionesMateriaCollection.doc(id).update({...PublicacionesMateria});
    }
  
    removePublicacionesMateria(id:string){
      return this.publicacionesMateriaCollection.doc(id).delete();
   }




}
