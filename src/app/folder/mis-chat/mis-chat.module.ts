import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisChatPageRoutingModule } from './mis-chat-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { MisChatPage } from './mis-chat.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    HttpClientModule,
    MisChatPageRoutingModule
  ],
  declarations: [MisChatPage]
})
export class MisChatPageModule {}
