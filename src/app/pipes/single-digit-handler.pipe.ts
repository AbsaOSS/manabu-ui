import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singleDigit'
})
export class SingleDigitHandlerPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let x = value;
    if(value === null) {
      return '00';
    }
    if (value < 10) {
      x = '0' + value.toString();
    }

    return x;
  }
}
