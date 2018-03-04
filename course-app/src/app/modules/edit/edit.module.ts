import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EditRoutingModule } from './edit.routing.module';

import { AuthorsListService } from './authors-list.service';

import {
  EditComponent,
  DurationComponent,
  ListAuthorsComponent,
  DateFormatComponent
} from './';

const editComponents = [
  EditComponent,
  DurationComponent,
  ListAuthorsComponent,
  DateFormatComponent
];

@NgModule({
  declarations: [
    ...editComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EditRoutingModule,
  ],
  providers: [
    AuthorsListService
  ],
  exports: [
    ...editComponents
  ]
})

export class EditModule { }
