import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PublicacionesPageRoutingModule } from './publicaciones-routing.module';
import { PublicacionesPage } from './publicaciones.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PublicacionesPageRoutingModule
  ],
  declarations: [PublicacionesPage]
})
export class PublicacionesPageModule {}
 