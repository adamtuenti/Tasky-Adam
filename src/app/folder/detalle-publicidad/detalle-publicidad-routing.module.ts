import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePublicidadPage } from './detalle-publicidad.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePublicidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePublicidadPageRoutingModule {}
