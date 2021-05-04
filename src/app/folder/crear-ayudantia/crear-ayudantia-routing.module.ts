import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAyudantiaPage } from './crear-ayudantia.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAyudantiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAyudantiaPageRoutingModule {}
