import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ILabeledData } from '../../models/ilabeled-data';
import { ReportService } from '../../services/report.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { environment } from 'src/environments/environment';


interface IPdfMake{ vfs: { [file: string]: string }  }
(pdfMake as IPdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels: string[] = [];

  public pieChartDatasets: Array<{ data: number[] }> = [ {
    data: []
  } ];

  public pieChartLegend = true;

  public pieChartPlugins = [];

  public display = false;

  constructor(public reportService: ReportService) { }

  ngOnInit(): void {
    
    this.reportService.ReportsSubscription().subscribe(
      () => {

        let labeledDataArray = this.reportService.GetAppointmentsBySpecialityAsLabeledData();

        labeledDataArray.forEach(

          (ld: ILabeledData) => {
            this.pieChartLabels.push(ld.label);
            this.pieChartDatasets[0].data.push(ld.data)
          }

        );

        this.display = true;

      }
    );

    if (this.reportService.ready) this.reportService.ReportsAreReady()
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
          text: "Reporte de turnos por especialidad",
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
