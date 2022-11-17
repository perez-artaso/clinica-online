import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ClinicalRecordRoutingModule } from './clinical-record-routing.module';
import { CrStateComponent } from './components/cr-state/cr-state.component';
import { ListCrsComponent } from './components/list-crs/list-crs.component';
import { ToLocaleDatePipe } from './pipes/to-locale-date.pipe';
import { ToLocaleTimePipe } from './pipes/to-locale-time.pipe';


@NgModule({
  declarations: [
    CrStateComponent,
    ListCrsComponent,
    ToLocaleDatePipe,
    ToLocaleTimePipe
  ],
  imports: [
    CommonModule,
    ClinicalRecordRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClinicalRecordModule { }
