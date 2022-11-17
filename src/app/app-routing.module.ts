import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'home', component: HomeComponent, data: {animation: "HomePage"}
  },
  {
    path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'appointments', loadChildren: () => import('./modules/appointment/appointment.module').then( m => m.AppointmentModule), data: {animation: "Fade"}
  },
  {
    path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then( m => m.ProfileModule), data: {animation: "Profile"}
  },
  {
    path: 'clinical-record', loadChildren: () => import ('./modules/clinical-record/clinical-record.module').then( m=> m.ClinicalRecordModule )
  },
  {
    path: 'reports', loadChildren: () => import('./modules/reports/reports.module').then( m => m.ReportsModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
