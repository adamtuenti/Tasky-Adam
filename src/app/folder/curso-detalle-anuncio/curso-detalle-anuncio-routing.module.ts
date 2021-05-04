import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoDetalleAnuncioPage } from './curso-detalle-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: CursoDetalleAnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoDetalleAnuncioPageRoutingModule {}
