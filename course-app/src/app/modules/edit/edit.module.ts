import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthorsListService } from './edit.service';

import {
  EditComponent,
  DurationComponent,
  ListAuthorsComponent,
  InputNumberComponent
} from './';

const editComponents = [
  EditComponent,
  DurationComponent,
  ListAuthorsComponent,
  InputNumberComponent
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
  providers: [
    AuthorsListService
  ],
  exports: [
    ...editComponents
  ]
})

export class EditModule { }
