import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisComentariosPage } from './mis-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: MisComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisComentariosPageRoutingModule {}
