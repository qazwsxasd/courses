import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CoreModule } from './core/core.module';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule,

    CoreModule,
    LoginModule,
    MainModule
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [  ],
  exports: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
