import { Pipe, PipeTransform } from '@angular/core';
import { Adopcion } from '../models/adopcion';

@Pipe({
  name: 'filtroAdopcion'
})
export class FiltroAdopcionPipe implements PipeTransform {

  transform( adopcion: Adopcion[], texto: string): Adopcion[] {
    if(texto.length ===0){return adopcion}
    texto=texto.toLocaleLowerCase()
    return adopcion.filter(adopcion => {
      return adopcion.Descripcion.toLocaleLowerCase().includes(texto) ||
      adopcion.Titulo.toLocaleLowerCase().includes(texto)
    });
  }

}
 