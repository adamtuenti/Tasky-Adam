import { NgModule } from '@angular/core';
import { FiltroCursoPipe } from './filtro-curso.pipe';
import { FiltroUsuarioPipe } from './filtro-usuario.pipe';
import { FiltroPublicacionPipe } from './filtro-publicacion.pipe';
import { FiltroAnuncioPipe } from './filtro-anuncio.pipe';
import { FiltroComentariosPipe } from './filtro-comentarios.pipe';
import { FiltroAdopcionPipe } from './filtro-adopcion.pipe';
import { FiltroVeterinariosPipe } from './filtro-veterinarios.pipe';


@NgModule({
  declarations: [FiltroCursoPipe, FiltroUsuarioPipe, FiltroPublicacionPipe, FiltroAnuncioPipe, FiltroComentariosPipe, FiltroAdopcionPipe, FiltroVeterinariosPipe],
  exports: [FiltroCursoPipe, FiltroUsuarioPipe, FiltroPublicacionPipe, FiltroAnuncioPipe, FiltroComentariosPipe, FiltroAdopcionPipe, FiltroVeterinariosPipe]
})
export class PipesModule { }
 