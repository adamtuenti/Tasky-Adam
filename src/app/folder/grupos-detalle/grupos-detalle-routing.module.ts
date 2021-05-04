import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposDetallePage } from './grupos-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: GruposDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposDetallePageRoutingModule {}
