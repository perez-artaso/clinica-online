import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ReportService } from '../../services/report.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


interface IPdfMake{ vfs: { [file: string]: string }  }
(pdfMake as IPdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.css']
})
export class LinearGraphComponent implements OnInit {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  
  public lineChartLegend = true;

  constructor(public reportService: ReportService) {
  }

  ngOnInit() {
    if (this.reportService.ready) this.reportService.ReportsAreReady();
  }

  GetBase64FromCanvas(canvas: any) {

    const data = canvas.toDataURL();

    const pdfDefintition: any = {
      content: [
        {
          image: data,
          width: 250,
          height: 250,
          alignment: 'center'
        }
      ]
    };

    const pdf = pdfMake.createPdf(pdfDefintition);
    pdf.open();


  }

}
