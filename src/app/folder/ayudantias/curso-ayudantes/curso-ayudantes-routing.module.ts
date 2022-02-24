import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoAyudantesPage } from './curso-ayudantes.page';

const routes: Routes = [
  {
    path: '',
    component: CursoAyudantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoAyudantesPageRoutingModule {}
