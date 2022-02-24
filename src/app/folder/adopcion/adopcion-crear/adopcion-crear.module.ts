import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdopcionCrearPageRoutingModule } from './adopcion-crear-routing.module';

import { AdopcionCrearPage } from './adopcion-crear.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdopcionCrearPageRoutingModule
  ],
  declarations: [AdopcionCrearPage]
})
export class AdopcionCrearPageModule {}
