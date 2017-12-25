import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CourseListService } from './container/course-list/course-list.service';

import {
  DurationFormatPipe,
  OrderItemsByPipe,
  StyledDirective
} from '../../shared';

import {
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent,
  ToolboxComponent,
} from './';

const mainComponents = [
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent,
  ToolboxComponent,
  DurationFormatPipe,
  OrderItemsByPipe,
  StyledDirective
];

@NgModule({
  declarations: [
    ...mainComponents,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CourseListService],
  exports: [
    ...mainComponents
  ]
})

export class MainModule { }
