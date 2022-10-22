import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientRegisterComponent } from './components/patient-register/patient-register.component';
import { SpecialistRegisterComponent } from './components/specialist-register/specialist-register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patient',
        component: PatientRegisterComponent
      },
      {
        path: 'specialist',
        component: SpecialistRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
