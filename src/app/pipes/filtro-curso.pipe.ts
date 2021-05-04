import { Pipe, PipeTransform } from '@angular/core';
import { Cursos } from '../models/cursos';

@Pipe({
  name: 'filtroCurso'
})
export class FiltroCursoPipe implements PipeTransform {

  transform(cursos: Cursos[], texto: string): Cursos[] {
    if(texto.length ===0){return cursos}
    texto=texto.toLocaleLowerCase()
    return cursos.filter(curso => {
      return curso.Nombre.toLocaleLowerCase().includes(texto);
    });
  }
}


