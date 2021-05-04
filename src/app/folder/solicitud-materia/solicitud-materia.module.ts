import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudMateriaPageRoutingModule } from './solicitud-materia-routing.module';

import { SolicitudMateriaPage } from './solicitud-materia.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudMateriaPageRoutingModule
  ],
  declarations: [SolicitudMateriaPage]
})
export class SolicitudMateriaPageModule {}
