import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisChatPageRoutingModule } from './mis-chat-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { MisChatPage } from './mis-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    MisChatPageRoutingModule
  ],
  declarations: [MisChatPage]
})
export class MisChatPageModule {}
