import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilCitaPage } from './editar-perfil-cita.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilCitaPageRoutingModule {}
