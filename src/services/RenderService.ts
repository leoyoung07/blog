'use strict';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default class RenderService {
  static getSummary(src: string, length?: number) {
    length = Math.abs(length || 200);
    return md.render(src)
      .replace(/<pre[\s\S]*>([\s\S]*)<\/pre>/g, '[code]$1[/code]')
      .replace(/<h[1-7][\s\S]*?>[\s\S]*?<\/h[1-7]>/g, '')
      .replace(/<(\/{0,1})code>/g, `[$1code]`)
      .replace(/<[^>]+>/g, ' ')
      .substr(0, length)
      .replace(/\[(\/{0,1})code\]/g, `<$1code>`)
      .replace(/<code><\/code>/g, '')
      .replace(/\n/g, '') + '...';
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
