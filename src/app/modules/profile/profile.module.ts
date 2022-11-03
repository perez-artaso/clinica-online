import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SpecialistProfileComponent } from './components/specialist-profile/specialist-profile.component';
import { MmsDirective } from './directives/mms.directive';
import { EditSpecialitiesComponent } from './components/edit-specialities/edit-specialities.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    SpecialistProfileComponent,
    MmsDirective,
    EditSpecialitiesComponent,
    PatientProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
