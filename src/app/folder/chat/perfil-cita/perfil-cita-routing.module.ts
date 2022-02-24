import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilCitaPage } from './perfil-cita.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilCitaPageRoutingModule {}
