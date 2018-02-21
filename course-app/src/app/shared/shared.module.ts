import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  // HeaderComponent,
  // FooterComponent,
  DurationFormatPipe,
  OrderItemsByPipe,
  FilterSearchPipe,
  StyledDirective
} from './';

const sharedComponents = [
  // HeaderComponent,
  // FooterComponent,
  DurationFormatPipe,
  OrderItemsByPipe,
  FilterSearchPipe,
  StyledDirective
];


@NgModule({
  declarations: [
    sharedComponents
  ],
  imports: [
    // BrowserModule,
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
