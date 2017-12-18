import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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
  ],
  exports: [
     ...components
  ]
})
export class LoginModule { }
