import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSpecialitiesComponent } from './components/edit-specialities/edit-specialities.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: "specialities",
        component: EditSpecialitiesComponent
      
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
