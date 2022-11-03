import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

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
