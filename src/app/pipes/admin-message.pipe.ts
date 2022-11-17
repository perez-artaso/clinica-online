import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminMessage',
  standalone: true
})
export class AdminMessagePipe implements PipeTransform {

  transform(value: string): string {
    return "[Mensaje Del Administrador]: " + value;
  }

}