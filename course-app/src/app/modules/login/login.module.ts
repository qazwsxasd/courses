import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import {
  LoginComponent
} from './login.component';

const components = [
  LoginComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
     ...components
  ]
})
export class LoginModule { }
