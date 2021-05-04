import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAyudantiaPageRoutingModule } from './crear-ayudantia-routing.module';

import { CrearAyudantiaPage } from './crear-ayudantia.page';

import { PipesModule } from 'src/app/pipes/pipes.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    PipesModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAyudantiaPageRoutingModule
  ],
  declarations: [CrearAyudantiaPage]
})
export class CrearAyudantiaPageModule {}
