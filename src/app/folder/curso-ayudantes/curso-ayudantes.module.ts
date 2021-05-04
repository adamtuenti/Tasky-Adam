import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoAyudantesPageRoutingModule } from './curso-ayudantes-routing.module';

import { CursoAyudantesPage } from './curso-ayudantes.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CursoAyudantesPageRoutingModule
  ],
  declarations: [CursoAyudantesPage]
})
export class CursoAyudantesPageModule {}
