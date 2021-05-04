import { NgModule } from '@angular/core';
import {HeaderComponent} from 'src/app/components/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({

imports: [
    FormsModule,
    CommonModule

  ],
declarations: [
    HeaderComponent,
],
exports: [RouterModule,HeaderComponent],

})
export class ComponentsModule { }