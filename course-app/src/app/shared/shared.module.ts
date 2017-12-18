import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  HeaderComponent,
  FooterComponent
} from './';

const sharedComponents = [
  HeaderComponent,
  FooterComponent
];


@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
   ...sharedComponents
  ]
})
export class SharedModule { }
