import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevioCitasPage } from './previo-citas.page';

const routes: Routes = [
  {
    path: '',
    component: PrevioCitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevioCitasPageRoutingModule {}
