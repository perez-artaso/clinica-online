import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IAppointmentsByDate } from '../../models/iappointments-by-date';
import { ReportService } from '../../services/report.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { environment } from 'src/environments/environment';

interface IPdfMake{ vfs: { [file: string]: string }  }
(pdfMake as IPdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Turnos Solicitados Por Fecha' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public display = false;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    
    this.reportService.ReportsSubscription().subscribe(
      () => {

        let groupedAppointments = this.reportService.GetGroupedAppointmentsByDate();
        let property: keyof typeof  groupedAppointments;

        let sortedGroupedAppointments: IAppointmentsByDate[] = [];

        for (property in groupedAppointments) {

          let newGrouppedAppointment: IAppointmentsByDate = {};
          newGrouppedAppointment[property] = groupedAppointments;

          sortedGroupedAppointments.push(newGrouppedAppointment);

        }

        sortedGroupedAppointments.sort(
          (a: IAppointmentsByDate, b: IAppointmentsByDate) => {

            let splittedFirstIAppointmentByDateProperty: string[] = [];
            let splittedSecondIAppointmentByDateProperty: string[] = [];

            for (property in a) {
              splittedFirstIAppointmentByDateProperty = property.split("/");
            }

            for (property in b) {
              splittedSecondIAppointmentByDateProperty = property.split("/");
            }

            if (splittedFirstIAppointmentByDateProperty?.length >= 3 && splittedSecondIAppointmentByDateProperty?.length >= 3) {
              
              let firstDate = new Date(
                Number(splittedFirstIAppointmentByDateProperty[2]), 
                Number(splittedFirstIAppointmentByDateProperty[1]),
                Number(splittedFirstIAppointmentByDateProperty[0])
              );

              let secondDate = new Date(
                Number(splittedSecondIAppointmentByDateProperty[2]), 
                Number(splittedSecondIAppointmentByDateProperty[1]),
                Number(splittedSecondIAppointmentByDateProperty[0])
              );

              return firstDate.getTime() - secondDate.getTime();

            }
          
            return 0;

          }
        );

        sortedGroupedAppointments.forEach(
          (sga: IAppointmentsByDate) => {
            for (property in sga) {
              this.barChartData.labels?.push(property);
              this.barChartData.datasets[0].data.push(sga[property][property]);
            }
          } 
        );

        this.display = true;

      }
    );
    if (this.reportService.ready) this.reportService.ReportsAreReady();
  }

  GetBase64FromCanvas(canvas: any) {

    const data = canvas.toDataURL();

    const pdfDefintition: any = {
      content: [
        {
          image: 'data:image/jpg;base64,' + environment.clinicLogo,
          width: 200,
          height: 200,
          alignment: 'center'
        },
        {
          text: "Reporte de turnos por fecha",
          fontSize: 22,
          bold: true,
          alignment: 'center'
        },
        {
          image: data,
          width: 400,
          height: 400,
          alignment: 'center',
          margin: [0, 50]
        }
      ]
    };

    const pdf = pdfMake.createPdf(pdfDefintition);
    pdf.open();


  }

}
