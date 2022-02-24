import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAyudantiasAnunciosPage } from './mis-ayudantias-anuncios.page';

const routes: Routes = [
  {
    path: '',
    component: MisAyudantiasAnunciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAyudantiasAnunciosPageRoutingModule {}
