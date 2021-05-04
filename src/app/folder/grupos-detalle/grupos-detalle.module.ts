import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GruposDetallePageRoutingModule } from './grupos-detalle-routing.module';

import { GruposDetallePage } from './grupos-detalle.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    GruposDetallePageRoutingModule
  ],
  declarations: [GruposDetallePage]
})
export class GruposDetallePageModule {}
