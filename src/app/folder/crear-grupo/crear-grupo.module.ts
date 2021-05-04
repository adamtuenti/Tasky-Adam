import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearGrupoPageRoutingModule } from './crear-grupo-routing.module';

import { CrearGrupoPage } from './crear-grupo.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CrearGrupoPageRoutingModule
  ],
  declarations: [CrearGrupoPage]
})
export class CrearGrupoPageModule {}
