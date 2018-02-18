import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AuthorsListService } from './edit.service';

import {
  EditComponent,
  DurationComponent,
  ListAuthorsComponent
} from './';

const editComponents = [
  EditComponent,
  DurationComponent,
  ListAuthorsComponent
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
    SharedModule
  ],
  providers: [
    AuthorsListService
  ],
  exports: [
    ...editComponents
  ]
})

export class EditModule { }
