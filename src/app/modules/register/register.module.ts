import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { PatientRegisterComponent } from './components/patient-register/patient-register.component';
import { SpecialistRegisterComponent } from './components/specialist-register/specialist-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecialitiesSelectionComponent } from './components/specialities-selection/specialities-selection.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';


@NgModule({
  declarations: [
    PatientRegisterComponent,
    SpecialistRegisterComponent,
    SpecialitiesSelectionComponent,
    AdminRegisterComponent
  ],
  exports: [
    PatientRegisterComponent,
    SpecialistRegisterComponent,
    AdminRegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterModule { }
