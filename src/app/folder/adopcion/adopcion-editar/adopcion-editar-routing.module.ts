import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdopcionEditarPage } from './adopcion-editar.page';

const routes: Routes = [
  {
    path: '',
    component: AdopcionEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdopcionEditarPageRoutingModule {}
