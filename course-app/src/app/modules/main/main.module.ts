import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CourseListService } from './container/course-list/course-list.service';
import { ContainerCommunicationService } from './container/container-communication.service';

import {
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent,
  ToolboxComponent,
  StyledDirective,
  DurationFormatPipe,
  OrderItemsByPipe,
  FilterSearchPipe
} from './';

const mainComponents = [
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent,
  ToolboxComponent,
  StyledDirective,
  DurationFormatPipe,
  OrderItemsByPipe,
  FilterSearchPipe
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
  providers: [CourseListService, ContainerCommunicationService],
  exports: [
    ...mainComponents
  ]
})

export class MainModule { }
