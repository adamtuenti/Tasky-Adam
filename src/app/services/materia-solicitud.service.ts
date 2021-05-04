import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MateriaSolicitud } from '../models/materia-solicitud';


@Injectable({
  providedIn: 'root'
})
export class MateriaSolicitudService {

    private materiasCollection: AngularFirestoreCollection <MateriaSolicitud>;
    private materias: Observable<MateriaSolicitud[]>;

    constructor(firestore: AngularFirestore) {
      this.materiasCollection = firestore.collection('MateriasSolicitud');
   
    }
  
    addMateria(MateriaSolicitud:MateriaSolicitud){
      return this.materiasCollection.add({...MateriaSolicitud})
    }




}