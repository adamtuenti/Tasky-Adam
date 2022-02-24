import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAyudantiasPage } from './mis-ayudantias.page';

const routes: Routes = [
  {
    path: '',
    component: MisAyudantiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAyudantiasPageRoutingModule {}
