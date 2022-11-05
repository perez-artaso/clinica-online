import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getInvertedLocaleDateStringByTimestamp(timestamp: string) {

    let localeDateString = new Date(Number(timestamp)).toLocaleDateString();
    let splittedDateString = localeDateString.split('/');

    if (splittedDateString[1].length == 1) splittedDateString[1] = '0' + splittedDateString[1] ;
    if (splittedDateString[0].length == 1) splittedDateString[0] = '0' + splittedDateString[0] ;
    
    if (splittedDateString.length == 3) {
      return splittedDateString[2] + '-' + splittedDateString[1] + '-' + splittedDateString[0];
    } else return localeDateString;

  }

  getLocaleDateStringByTimestamp(timestamp: string): string {
    return new Date(Number(timestamp)).toLocaleDateString();
  }

  getLocaleTimeStringByTimestamp(timestamp: string): string {
     const date = new Date(Number(timestamp));
     return date.getHours().toString() + ":" + (date.getMinutes().toString().length == 1 ? "0" + date.getMinutes().toString() : date.getMinutes().toString());
  }

  getDayOfTheWeekNameByTimestamp(timestamp: string): string {

    let date = new Date(Number(timestamp));
    let dayName = "";

    switch(date.getDay()) {

      case 1: 
        dayName = "Lunes";
      break;

      case 2:
        dayName = "Martes";
      break;

      case 3:
        dayName = "Miércoles";
      break;

      case 4:
        dayName = "Jueves";
      break;

      case 5:
        dayName = "Viernes";
      break;

      case 6:
        dayName = "Sábado";
      break;

      case 0:
        dayName = "Domingo";
      break;

    }

    return dayName;


  }

}
