import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  HeaderComponent,
  FooterComponent,
} from './';

const sharedComponents = [
  HeaderComponent,
  FooterComponent,
];


@NgModule({
  declarations: [
    sharedComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    sharedComponents
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [] // if ever
    };
  }
}
