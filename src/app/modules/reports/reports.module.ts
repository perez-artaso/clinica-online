import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReactiveFormsModule  } from '@angular/forms';
import { LinearGraphComponent } from './components/linear-graph/linear-graph.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { AppointmentsBySpecialistInRangeComponent } from './components/appointments-by-specialist-in-range/appointments-by-specialist-in-range.component';
import { LoginLogsTableComponent } from './components/login-logs-table/login-logs-table.component';


@NgModule({
  declarations: [
    LinearGraphComponent,
    PieChartComponent,
    BarChartComponent,
    AppointmentsBySpecialistInRangeComponent,
    LoginLogsTableComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgChartsModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
