import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentariosUsuarioPage } from './comentarios-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentariosUsuarioPageRoutingModule {}
