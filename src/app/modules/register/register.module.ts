import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { PatientRegisterComponent } from './components/patient-register/patient-register.component';
import { SpecialistRegisterComponent } from './components/specialist-register/specialist-register.component';


@NgModule({
  declarations: [
    PatientRegisterComponent,
    SpecialistRegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
