import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CourseListComponent,
    CourseItemComponent,
    ToolboxComponent,
  ],
  exports: [
    CourseListComponent,
    ToolboxComponent
  ],
  providers: [],
})
export class ContainerModule { }
