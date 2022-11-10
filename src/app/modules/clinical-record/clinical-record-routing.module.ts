import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrStateComponent } from './components/cr-state/cr-state.component';
import { ListCrsComponent } from './components/list-crs/list-crs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'state',
        component: CrStateComponent
      },
      {
        path: 'list',
        component: ListCrsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicalRecordRoutingModule { }
