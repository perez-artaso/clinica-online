import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: Array<any> = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getDocuments().subscribe(
      (userProfiles) => {
        this.users = userProfiles;
      }
    );
  }

  exportAsExcel(tableElement: any) {

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(tableElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, "usuarios-clinica-online.xlsx");

  }

  getUserSpecialities(user: any): string {

    let specialities = "";

    if(user.specialities) {
      
      user.specialities.forEach(
        (s: any) => specialities += s + ", "
      );

      specialities = specialities.slice(0, specialities.length-2);

    }

    return specialities;

  }

  getRoleAsString(role: number): string {
    switch(role) {
      case 0: return "Paciente";
      case 1: return "Especialista";
      case 2: return "Administrador";
      default: return "";
    }
  }

}