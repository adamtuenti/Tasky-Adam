import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevioCitasPageRoutingModule } from './previo-citas-routing.module';

import { PrevioCitasPage } from './previo-citas.page';

import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PrevioCitasPageRoutingModule
  ],
  declarations: [PrevioCitasPage]
})
export class PrevioCitasPageModule {}
