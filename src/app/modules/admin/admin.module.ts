import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SpecialistManagementComponent } from './components/specialist-management/specialist-management.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { RegisterModule } from '../register/register.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ReportsComponent } from './components/reports/reports.component';


@NgModule({
  declarations: [
    SpecialistManagementComponent,
    NewUserComponent,
    ListUsersComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RegisterModule
  ]
})
export class AdminModule { }
