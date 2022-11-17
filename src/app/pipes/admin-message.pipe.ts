import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminMessage'
})
export class AdminMessagePipe implements PipeTransform {

  transform(value: string): string {
    return "[Admin]: " + value;
  }

}
