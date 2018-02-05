import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  EditComponent
} from './';

const editComponents = [
  EditComponent,
];

@NgModule({
  declarations: [
    ...editComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...editComponents
  ]
})

export class EditModule { }
