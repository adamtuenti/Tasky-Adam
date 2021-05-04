import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacionesMateriaPage } from './publicaciones-materia.page';

const routes: Routes = [
  {
    path: '',
    component: PublicacionesMateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacionesMateriaPageRoutingModule {}
