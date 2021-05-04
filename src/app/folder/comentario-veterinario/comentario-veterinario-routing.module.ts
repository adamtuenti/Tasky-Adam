import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentarioVeterinarioPage } from './comentario-veterinario.page';

const routes: Routes = [
  {
    path: '',
    component: ComentarioVeterinarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentarioVeterinarioPageRoutingModule {}
