import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


import { SimpleDialogService } from './dialogs/simple-dialog.service';
import { AuthService } from './auth/auth.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { MatDialogService } from './dialogs/matDialog.service';
import { HttpConfigService } from './http-config/http-config.service';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';

import { ConfirmDialogComponent } from './dialogs/matDialog.component';

const coreComponents = [
  LoaderComponent
  // ConfirmDialogComponent
];

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ...coreComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SimpleDialogService,
    MatDialogService,
    AuthService,
    LocalStorageService,
    // HttpConfigService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      deps: [LoaderService],
      useClass: HttpConfigService,
      multi: true
    }
    // { provide: 'StorageService', useValue: isPlatformBrowser(PLATFORM_ID) ? LocalStorageService : null }
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    ...coreComponents,
  ]
})

export class CoreModule { }

