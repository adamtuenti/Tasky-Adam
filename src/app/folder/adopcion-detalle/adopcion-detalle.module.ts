import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdopcionDetallePageRoutingModule } from './adopcion-detalle-routing.module';

import { AdopcionDetallePage } from './adopcion-detalle.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdopcionDetallePageRoutingModule
  ],
  declarations: [AdopcionDetallePage]
})
export class AdopcionDetallePageModule {}
