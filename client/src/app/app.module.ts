import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  NbThemeModule,
  NbLayoutModule,
  NbListModule,
  NbSidebarModule,
  NbCardModule,
  NbMenuModule,
  NbIconModule,
  NbFormFieldModule,
  NbInputModule,
  NbButtonModule,
  NbTreeGridModule,
  NbActionsModule,
  NbSpinnerModule,
  NbToastrModule,
  NbToastrService,
  NbDialogModule,
  NbGlobalPhysicalPosition,
  NbAutocompleteModule,
  NbSelectModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appEffects, appReducers } from './store/store';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PartsComponent } from './components/parts/parts.component';
import { RejectionsComponent } from './components/rejections/rejections.component';
import { PartComponent } from './components/parts/part/part.component';
import { RejectionComponent } from './components/rejections/rejection/rejection.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { RecordListComponent } from './components/data-entry/record-list/record-list.component';
import { RecordsComponent } from './components/records/records.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PartsComponent,
    RejectionsComponent,
    PartComponent,
    RejectionComponent,
    DataEntryComponent,
    ReportsComponent,
    SandboxComponent,
    DialogComponent,
    AddModalComponent,
    RecordListComponent,
    RecordsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbListModule,
    NbSidebarModule.forRoot(),
    NbCardModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbEvaIconsModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbTreeGridModule,
    NbActionsModule,
    NbSpinnerModule,
    NbToastrModule.forRoot({
      destroyByClick: true,
      duration: 10000,
      position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NbDialogModule.forChild({ closeOnEsc: true }),
    NbAutocompleteModule,
    NbSelectModule,
    NbTreeGridModule,
  ],
  providers: [NbToastrService],
  bootstrap: [AppComponent],
})
export class AppModule {}
