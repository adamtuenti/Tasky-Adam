import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudMateriaPage } from './solicitud-materia.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudMateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudMateriaPageRoutingModule {}
