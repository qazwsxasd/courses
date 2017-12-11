import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CourseListService } from './container/course-list/course-list.service';

import { 
    HeaderComponent,
    FooterComponent,
    ToolboxComponent } from '../../shared/';

import { 
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent
} from './';

const sharedComponents = [
    HeaderComponent,
    FooterComponent,
    ToolboxComponent    
];

const mainComponents = [
  ContainerComponent,
  CourseListComponent,
  CourseItemComponent
];

@NgModule({
  declarations: [
    ...mainComponents
    // ...sharedComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [CourseListService],
  exports: [
    ...mainComponents
  ]
})

export class MainModule { }
