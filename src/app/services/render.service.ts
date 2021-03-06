import { Injectable } from '@angular/core';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor() { }

  getSummary(src: string, length?: number) {
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
}
