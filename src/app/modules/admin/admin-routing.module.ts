import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SpecialistManagementComponent } from './components/specialist-management/specialist-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'specialists',
        component: SpecialistManagementComponent
      },
      {
        path: 'new-user',
        component: NewUserComponent
      },
      {
        path: 'list-users',
        component: ListUsersComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
