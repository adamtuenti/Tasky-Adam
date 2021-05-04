import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdopcionCrearPage } from './adopcion-crear.page';

const routes: Routes = [
  {
    path: '',
    component: AdopcionCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdopcionCrearPageRoutingModule {}
