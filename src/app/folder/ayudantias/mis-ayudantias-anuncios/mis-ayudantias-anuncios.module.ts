import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAyudantiasAnunciosPageRoutingModule } from './mis-ayudantias-anuncios-routing.module';

import { MisAyudantiasAnunciosPage } from './mis-ayudantias-anuncios.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MisAyudantiasAnunciosPageRoutingModule
  ],
  declarations: [MisAyudantiasAnunciosPage]
})
export class MisAyudantiasAnunciosPageModule {}
