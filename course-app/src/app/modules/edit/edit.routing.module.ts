import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditResolveGuard } from './edit-resolve.guard';
import { AuthorResolveGuard } from './authors-resolve.guard';

import { CanDeactivateGuard} from '../../core/guards/deactivate.guard';

import { EditComponent } from './index';

const routes: Routes = [
  {
    path: 'new',
    component: EditComponent,
    canDeactivate: [CanDeactivateGuard],
    data: { title: 'new course' },
    resolve: {
      authors: AuthorResolveGuard
    }
  },
  {
    path: ':id',
    component: EditComponent,
    canDeactivate: [CanDeactivateGuard],
    data: { title: 'edit course' },
    runGuardsAndResolvers: 'always',
    resolve: {
      course: EditResolveGuard,
      authors: AuthorResolveGuard
    }
  }
];

export let editRouterComponents = [EditComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [EditResolveGuard, AuthorResolveGuard, CanDeactivateGuard]
})
export class EditRoutingModule { }
