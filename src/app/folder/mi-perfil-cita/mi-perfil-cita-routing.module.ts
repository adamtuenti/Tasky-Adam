import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiPerfilCitaPage } from './mi-perfil-cita.page';

const routes: Routes = [
  {
    path: '',
    component: MiPerfilCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiPerfilCitaPageRoutingModule {}
