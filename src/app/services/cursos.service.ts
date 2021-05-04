import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cursos } from '../models/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

    private cursosCollection: AngularFirestoreCollection <Cursos>;
    private cursos: Observable<Cursos[]>;

    constructor(firestore: AngularFirestore) {
      this.cursosCollection = firestore.collection('Materias', ref => ref.orderBy("Nombre", "asc"));
      this.cursos = this.cursosCollection.snapshotChanges().pipe(map(
        actions =>{
          return actions.map( a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          })
        }
      ))
    }
    getCursos(){
      return this.cursos;
    }
    
    getCurso(id:string){
      return this.cursosCollection.doc<Cursos>(id).valueChanges();
    }




}
