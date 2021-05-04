import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPublicacionPageRoutingModule } from './crear-publicacion-routing.module';

import { CrearPublicacionPage } from './crear-publicacion.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPublicacionPageRoutingModule
  ],
  declarations: [CrearPublicacionPage]
})
export class CrearPublicacionPageModule {}
