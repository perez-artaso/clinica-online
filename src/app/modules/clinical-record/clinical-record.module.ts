import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClinicalRecordRoutingModule } from './clinical-record-routing.module';
import { CrStateComponent } from './components/cr-state/cr-state.component';


@NgModule({
  declarations: [
    CrStateComponent
  ],
  imports: [
    CommonModule,
    ClinicalRecordRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClinicalRecordModule { }
