import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudAyudantiaPage } from './solicitud-ayudantia.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudAyudantiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudAyudantiaPageRoutingModule {}
