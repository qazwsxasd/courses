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
import { HeaderComponent, FooterComponent } from './shared';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { BreadcrumsComponent} from './shared/breadcrums/breadcrums.component';

import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent, FooterComponent,
    BreadcrumsComponent
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
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [  ],
  exports: [  HeaderComponent, FooterComponent, BreadcrumsComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
