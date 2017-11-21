import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ContainerModule } from './core/container';

import { FetchService } from './services/fetch.service';


import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { ContainerComponent } from './core/container/container.component';
import { FooterComponent } from './core/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContainerModule
  ],
  providers: [
    FetchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
