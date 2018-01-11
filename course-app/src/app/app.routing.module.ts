import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { ContainerComponent } from './modules/main/container/container.component';
import { EditComponent } from './modules/edit/edit.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'main',
    component: ContainerComponent,
    data: { title: 'Course List'}
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login'}
  },
  {
    path: 'edit',
    component: EditComponent,
    data: { title: 'Add/Edit'}
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

// TODO ask about lazy

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
