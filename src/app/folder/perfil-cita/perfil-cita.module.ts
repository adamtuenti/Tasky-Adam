import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilCitaPageRoutingModule } from './perfil-cita-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { PerfilCitaPage } from './perfil-cita.page';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    PerfilCitaPageRoutingModule
  ],
  declarations: [PerfilCitaPage]
})
export class PerfilCitaPageModule {}
