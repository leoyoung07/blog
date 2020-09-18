'use strict';
import moment from 'moment';
export default class Util {
  static navTo(url: string) {
    window.open(url, '_blank');
  }
  static getLocalDateTime(utcDateTime: moment.MomentInput) {
    return moment.utc(utcDateTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
  }

  static colorStr2Array(rgb: string) {
    rgb = rgb.replace(/#/gi, '');
    let begin = 0;
    let step = 0;
    if (rgb.length === 3) {
      step = 1;
    } else if (rgb.length === 6) {
      step = 2;
    } else {
      return [0, 0, 0];
    }
    const rStr = rgb.substr(begin, step);
    begin += step;
    const gStr = rgb.substr(begin, step);
    begin += step;
    const bStr = rgb.substr(begin, step);
    return [parseInt(rStr, 16), parseInt(gStr, 16), parseInt(bStr, 16)];
  }

  static getAccessibleColor(rgb: string | number[]) {
    if (typeof rgb === 'string') {
      rgb = this.colorStr2Array(rgb);
    }
    const [r, g, b] = rgb;
    const colors = [r / 255, g / 255, b / 255];
    const c = colors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179)
      ? '#000000'
      : '#FFFFFF';
  }
}
