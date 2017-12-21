import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CourseListService } from './container/course-list/course-list.service';

import {
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent,
  ToolboxComponent,
  StyledDirective,
  DurationFormatPipe,
  OrderItemsByPipe,
} from './';

const mainComponents = [
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent,
  ToolboxComponent,
  StyledDirective,
  DurationFormatPipe,
  OrderItemsByPipe,
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
