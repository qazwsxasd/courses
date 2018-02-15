import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CoreModule } from './core/core.module';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';
import { EditModule } from './modules/edit/edit.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,

    CoreModule,
    LoginModule,
    MainModule,
    EditModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [  ],
  exports: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
