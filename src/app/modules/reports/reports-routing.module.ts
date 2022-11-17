import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsBySpecialistInRangeComponent } from './components/appointments-by-specialist-in-range/appointments-by-specialist-in-range.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LinearGraphComponent } from './components/linear-graph/linear-graph.component';
import { LoginLogsTableComponent } from './components/login-logs-table/login-logs-table.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'linear-graph',
        component: LinearGraphComponent
      },
      {
        path: 'pie-chart',
        component: PieChartComponent
      },
      {
        path: 'bar-chart',
        component: BarChartComponent
      },
      {
        path: 'appointments-by-specialist',
        component: AppointmentsBySpecialistInRangeComponent
      },
      {
        path: 'login-logs',
        component: LoginLogsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
