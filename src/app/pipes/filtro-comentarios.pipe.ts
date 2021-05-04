import { Pipe, PipeTransform } from '@angular/core';

import { Comentarios } from 'src/app/models/comentarios';
@Pipe({
  name: 'filtroComentarios'
})
export class FiltroComentariosPipe implements PipeTransform {

  transform( comentarios: Comentarios[], texto: string): Comentarios[] {
    if(texto.length ===0){return comentarios}
    texto=texto.toLocaleLowerCase()
    return comentarios.filter(comentarios => {
      return comentarios.Comentario.toLocaleLowerCase().includes(texto) 
    });
  }

}
