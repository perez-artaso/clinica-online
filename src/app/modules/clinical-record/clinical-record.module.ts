import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ClinicalRecordRoutingModule } from './clinical-record-routing.module';
import { CrStateComponent } from './components/cr-state/cr-state.component';
import { ListCrsComponent } from './components/list-crs/list-crs.component';


@NgModule({
  declarations: [
    CrStateComponent,
    ListCrsComponent
  ],
  imports: [
    CommonModule,
    ClinicalRecordRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClinicalRecordModule { }
