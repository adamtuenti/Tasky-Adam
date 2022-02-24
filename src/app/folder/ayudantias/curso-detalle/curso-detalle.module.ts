import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoDetallePageRoutingModule } from './curso-detalle-routing.module';

import { CursoDetallePage } from './curso-detalle.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
  
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CursoDetallePageRoutingModule
  ],
  declarations: [CursoDetallePage]
})
export class CursoDetallePageModule {}
