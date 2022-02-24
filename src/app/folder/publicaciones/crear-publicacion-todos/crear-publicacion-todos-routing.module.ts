import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPublicacionTodosPage } from './crear-publicacion-todos.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPublicacionTodosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPublicacionTodosPageRoutingModule {}
