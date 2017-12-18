import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


import { SimpleDialogService } from './dialogs/simple-dialog.service';
import { AuthService } from './auth/auth.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { MatDialogService } from './dialogs/matDialog.service';

import { ConfirmDialogComponent } from './dialogs/matDialog.component';

const coreComponents = [
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
  ],
  providers: [
    SimpleDialogService,
    MatDialogService,
    AuthService,
    LocalStorageService,
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

