import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisChatPage } from './mis-chat.page';

const routes: Routes = [
  {
    path: '',
    component: MisChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisChatPageRoutingModule {}
