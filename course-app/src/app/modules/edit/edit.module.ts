import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  EditComponent,
  DurationComponent,
} from './';

const editComponents = [
  EditComponent,
  DurationComponent,
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
