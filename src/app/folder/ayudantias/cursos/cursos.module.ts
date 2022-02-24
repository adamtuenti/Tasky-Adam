import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosPageRoutingModule } from './cursos-routing.module';

import { CursosPage } from './cursos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CursosPageRoutingModule
  ],
  declarations: [CursosPage]
})
export class CursosPageModule {}
