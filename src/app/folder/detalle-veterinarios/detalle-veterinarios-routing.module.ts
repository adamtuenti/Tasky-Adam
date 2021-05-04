import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleVeterinariosPage } from './detalle-veterinarios.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleVeterinariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleVeterinariosPageRoutingModule {}
