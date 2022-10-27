import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
