import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendientePageRoutingModule } from './pendiente-routing.module';

import { PendientePage } from './pendiente.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    PendientePageRoutingModule
  ],
  declarations: [PendientePage]
})
export class PendientePageModule {}
