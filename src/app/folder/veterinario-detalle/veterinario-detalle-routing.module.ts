import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeterinarioDetallePage } from './veterinario-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: VeterinarioDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeterinarioDetallePageRoutingModule {}
