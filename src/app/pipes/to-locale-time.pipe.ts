import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from 'src/app/services/date.service';

@Pipe({
  name: 'toLocaleTime'
})
export class ToLocaleTimePipe implements PipeTransform {

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
