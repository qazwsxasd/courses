import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  LoginComponent,
  ContainerComponent,
  ContainerModule
} from './';

const coreComponents = [
  LoginComponent,
  ContainerComponent
];


@NgModule({
  declarations: [
    ...coreComponents,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContainerModule
  ],
  exports: [
    ...coreComponents
  ]
})

export class CoreModule { }
