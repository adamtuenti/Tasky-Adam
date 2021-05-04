import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilCitaPageRoutingModule } from './editar-perfil-cita-routing.module';

import { EditarPerfilCitaPage } from './editar-perfil-cita.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    EditarPerfilCitaPageRoutingModule
  ],
  declarations: [EditarPerfilCitaPage]
})
export class EditarPerfilCitaPageModule {}
