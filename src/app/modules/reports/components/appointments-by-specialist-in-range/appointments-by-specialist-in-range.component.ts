import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { IAppointmentsBySpecialist } from 'src/app/models/iappointments-by-specialist';
import { ReportService } from '../../services/report.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { environment } from 'src/environments/environment';


interface IPdfMake{ vfs: { [file: string]: string }  }
(pdfMake as IPdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-appointments-by-specialist-in-range',
  templateUrl: './appointments-by-specialist-in-range.component.html',
  styleUrls: ['./appointments-by-specialist-in-range.component.css']
})
export class AppointmentsBySpecialistInRangeComponent implements OnInit {

  public finalizedSelected: boolean = false;

  public dateForm = new FormGroup(
    {
      from: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)])),
      to: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)]))
    }
  );

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels: string[] = [ ];

  public pieChartDatasets: Array<{ data: number[] }> = [ {
    data: []
  } ];

  public pieChartLegend = true;

  public pieChartPlugins = [];

  public display = false;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {

    let date1 = new Date(2022, 1, 1);
    let date2 = new Date(2023, 1, 1);

    this.reportService.ReportsSubscription().subscribe(
      () => {

        let appointmentsBySpecialist: IAppointmentsBySpecialist = this.reportService.GetRequestedAppointmentsBySpecialistInRange(date1.getTime(), date2.getTime());

        let property: keyof typeof appointmentsBySpecialist;

        for (property in appointmentsBySpecialist) {

          this.pieChartLabels.push(appointmentsBySpecialist[property].name + ": " + appointmentsBySpecialist[property].appointments.length);
          this.pieChartDatasets[0].data.push(appointmentsBySpecialist[property].appointments.length);

        }

        this.display = true;

      }
    );

    if (this.reportService.ready) this.reportService.ReportsAreReady();

  }

  onSubmit() {

    if (this.dateForm.valid) {

      let from = this.dateForm.controls['from'].value;
      let to = this.dateForm.controls['to'].value;

      if (from && to) {

        let splittedFrom = from.split("/");
        let splittedTo = to.split("/");

        let date1 = new Date(Number(splittedFrom[2]), Number(splittedFrom[1]) - 1, Number(splittedFrom[0]));
        let date2 = new Date(Number(splittedTo[2]), Number(splittedTo[1]) - 1, Number(splittedTo[0]));
  
        this.pieChartLabels = [];
        this.pieChartDatasets = [{data: []}];
  
        let appointmentsBySpecialist: IAppointmentsBySpecialist =
        this.finalizedSelected ? this.reportService.GetFinalizedAppointmentsBySpecialistInRange(date1.getTime(), date2.getTime()) 
        : 
        this.reportService.GetRequestedAppointmentsBySpecialistInRange(date1.getTime(), date2.getTime());
  
        let property: keyof typeof appointmentsBySpecialist;
  
        for (property in appointmentsBySpecialist) {
  
          this.pieChartLabels.push(appointmentsBySpecialist[property].name + ": " + appointmentsBySpecialist[property].appointments.length);
          this.pieChartDatasets[0].data.push(appointmentsBySpecialist[property].appointments.length);
  
        }

      }      

    } else {

      this.dateForm.markAllAsTouched();

    }

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
          text: "Turnos por especialista entre " + this.dateForm.controls['from'].value + " y " + this.dateForm.controls['to'].value,
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
