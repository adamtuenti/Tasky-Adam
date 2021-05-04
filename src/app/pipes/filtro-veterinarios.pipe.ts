import { Pipe, PipeTransform } from '@angular/core';
import { Veterinarios } from '../models/veterinarios';

@Pipe({
  name: 'filtroVeterinarios'
})
export class FiltroVeterinariosPipe implements PipeTransform {

  transform(usuarios: Veterinarios[], texto: string): Veterinarios[] {
    if(texto.length ===0){return usuarios}
      texto=texto.toLocaleLowerCase()
      return usuarios.filter(usuarios => {
        let usuarioCompleto = usuarios.Nombres +" " + usuarios.Apellidos
        return usuarioCompleto.toLocaleLowerCase().includes(texto) ||
        usuarios.Descripcion.toLocaleLowerCase().includes(texto) ||
        usuarios.Direccion.toLocaleLowerCase().includes(texto) ||
        usuarios.RedSocial.toLocaleLowerCase().includes(texto)
            
    });
  }
}
