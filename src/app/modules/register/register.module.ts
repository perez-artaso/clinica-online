import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { PatientRegisterComponent } from './components/patient-register/patient-register.component';
import { SpecialistRegisterComponent } from './components/specialist-register/specialist-register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientRegisterComponent,
    SpecialistRegisterComponent
  ],
  exports: [
    PatientRegisterComponent,
    SpecialistRegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
