import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined, term: string | null): SafeHtml {
    if (!value) return '';
    if (!term || term.trim() === '') return value;

    try {
      // Escape special characters to prevent regex breaking
      const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const highlighted = value.replace(re, '<mark class="highlight">$1</mark>');

      // We must tell Angular this HTML is safe to render
      return this.sanitizer.bypassSecurityTrustHtml(highlighted);
    } catch (e) {
      return value;
    }
  }
}
