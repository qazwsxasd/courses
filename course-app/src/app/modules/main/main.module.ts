import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CourseListService } from './container/course-list/course-list.service';
import { MainRoutingModule } from './main.routing.module';

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
];

@NgModule({
  declarations: [
    ...mainComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [CourseListService],
  exports: [
    ...mainComponents
  ]
})

export class MainModule { }
