import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisComentariosPageRoutingModule } from './mis-comentarios-routing.module';

import { MisComentariosPage } from './mis-comentarios.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MisComentariosPageRoutingModule
  ],
  declarations: [MisComentariosPage]
})
export class MisComentariosPageModule {}