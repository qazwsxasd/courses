import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  ContainerComponent,
  ContainerModule
} from './';

const coreComponents = [
  ContainerComponent
];


@NgModule({
  declarations: [
    ...coreComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContainerModule
  ],
  exports: [
    ...coreComponents,
  ]
})

export class CoreModule { }
