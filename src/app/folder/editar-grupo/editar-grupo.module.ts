import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarGrupoPageRoutingModule } from './editar-grupo-routing.module';

import { EditarGrupoPage } from './editar-grupo.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditarGrupoPageRoutingModule
  ],
  declarations: [EditarGrupoPage]
})
export class EditarGrupoPageModule {}
