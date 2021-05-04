import { Pipe, PipeTransform } from '@angular/core';
import { PublicacionesMateria } from '../models/publicaciones-materia';

@Pipe({
  name: 'filtroAnuncio'
})
export class FiltroAnuncioPipe implements PipeTransform {

  transform( anuncios: PublicacionesMateria[], texto: string): PublicacionesMateria[] {
    if(texto.length ===0){return anuncios}
    texto=texto.toLocaleLowerCase()
    return anuncios.filter(anuncio => {
      return anuncio.Descripcion.toLocaleLowerCase().includes(texto) ||
      anuncio.Titulo.toLocaleLowerCase().includes(texto)
    });
  }

}
