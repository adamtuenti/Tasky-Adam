import { Pipe, PipeTransform } from '@angular/core';
import { Usuarios } from '../models/usuarios';

@Pipe({
  name: 'filtroUsuario'
})
export class FiltroUsuarioPipe implements PipeTransform {

  transform(usuarios: Usuarios[], texto: string): Usuarios[] {
    if(texto.length ===0){return usuarios}
      texto=texto.toLocaleLowerCase()
      return usuarios.filter(usuarios => {
        let usuarioCompleto = usuarios.Nombre +" " + usuarios.Apellido
        return usuarioCompleto.toLocaleLowerCase().includes(texto)
            
    });
  }
}
