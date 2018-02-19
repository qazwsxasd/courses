import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';

import { LoginComponent } from './modules/login/login.component';
import { EditComponent } from './modules/edit/edit.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: './modules/main/main.module#MainModule'
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
