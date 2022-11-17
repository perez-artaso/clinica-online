import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../services/date.service';

@Pipe({
  name: 'toLocaleDate'
})
export class ToLocaleDatePipe implements PipeTransform {

  constructor(private dateService: DateService){}

  transform(value: string): string {

    let transformedValue: string = "";

    if (isNaN(Number(value))) {

      transformedValue = value;

    } else {

      transformedValue = this.dateService.getLocaleTimeStringByTimestamp(value);

    }

    return transformedValue;

  }

}
