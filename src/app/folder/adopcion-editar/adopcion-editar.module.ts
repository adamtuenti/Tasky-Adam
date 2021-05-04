import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdopcionEditarPageRoutingModule } from './adopcion-editar-routing.module';

import { AdopcionEditarPage } from './adopcion-editar.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdopcionEditarPageRoutingModule
  ],
  declarations: [AdopcionEditarPage]
})
export class AdopcionEditarPageModule {}
