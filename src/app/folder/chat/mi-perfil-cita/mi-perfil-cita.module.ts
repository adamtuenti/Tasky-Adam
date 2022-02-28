import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPerfilCitaPageRoutingModule } from './mi-perfil-cita-routing.module';

import { MiPerfilCitaPage } from './mi-perfil-cita.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,

    HttpClientModule,

    
    IonicModule,
    MiPerfilCitaPageRoutingModule
  ],
  declarations: [MiPerfilCitaPage]
})
export class MiPerfilCitaPageModule {}
