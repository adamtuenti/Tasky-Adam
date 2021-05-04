import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasPageRoutingModule } from './citas-routing.module';

import { CitasPage } from './citas.page';
// import { SwipeCardsModule } from 'ng2-swipe-cards';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    // SwipeCardsModule,
    FormsModule,
    IonicModule,
    CitasPageRoutingModule
  ],
  declarations: [CitasPage]
})
export class CitasPageModule {}
