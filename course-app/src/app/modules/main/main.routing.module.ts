import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './index';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    data: { title: 'Course List'}
  }
];

export let mainRouterComponents = [ContainerComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }
