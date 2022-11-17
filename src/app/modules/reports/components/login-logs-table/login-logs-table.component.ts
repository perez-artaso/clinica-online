import { Component, OnInit } from '@angular/core';
import { LoginLog } from 'src/app/models/login-log';
import { DateService } from 'src/app/services/date.service';
import { ReportService } from '../../services/report.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-login-logs-table',
  templateUrl: './login-logs-table.component.html',
  styleUrls: ['./login-logs-table.component.css']
})
export class LoginLogsTableComponent implements OnInit {

  public loginLogs: LoginLog[] = [];

  constructor(public reportService: ReportService, public dateService: DateService) { }

  ngOnInit(): void {
    this.reportService.GetLoginLogs().subscribe(
      (ll: LoginLog[]) => {
        this.loginLogs = ll;
        console.dir(ll)
      }
    )
  }

  exportAsExcel(tableElement: any) {

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(tableElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, "logins.xlsx");

  }

}
