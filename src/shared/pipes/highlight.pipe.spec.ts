import { HighlightPipe } from './highlight.pipe';
import { DomSanitizer } from "@angular/platform-browser";
import { inject } from "@angular/core";

describe('HighlightPipe', () => {
  it('create an instance', () => {
    const sanitizer = inject(DomSanitizer)
    const pipe = new HighlightPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
