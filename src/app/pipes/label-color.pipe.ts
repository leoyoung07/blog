import { Pipe, PipeTransform } from '@angular/core';
import Util from '../util/util';

@Pipe({
  name: 'labelColor',
})
export class LabelColorPipe implements PipeTransform {
  transform(backgroundColor: string, ...args: any[]): string {
    const color = Util.getAccessibleColor(backgroundColor);
    return `background-color: #${backgroundColor}; color: ${color}`;
  }
}
