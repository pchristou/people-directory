import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Since it's a standalone pipe, we can just use the real sanitizer
      // or provide a mock. For simple unit tests, the real one is fine.
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => `safe_${val}`
          }
        }
      ]
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new HighlightPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if value is null or undefined', () => {
    expect(pipe.transform(null, 'test')).toBe('');
    expect(pipe.transform(undefined, 'test')).toBe('');
  });

  it('should return original value if term is empty', () => {
    const text = 'Hello World';
    expect(pipe.transform(text, '')).toBe(text);
    expect(pipe.transform(text, '   ')).toBe(text);
  });

  it('should wrap matching text in <mark> tags', () => {
    const text = 'Angular is great';
    const term = 'Angular';
    const result = pipe.transform(text, term) as string;

    // Note: because we mocked the sanitizer, it prepends 'safe_'
    expect(result).toContain('<mark class="highlight">Angular</mark>');
    expect(result).toContain('safe_');
  });

  it('should be case-insensitive', () => {
    const text = 'ANGULAR';
    const term = 'angular';
    const result = pipe.transform(text, term) as string;

    expect(result).toContain('<mark class="highlight">ANGULAR</mark>');
  });

  it('should handle special regex characters in the search term safely', () => {
    const text = 'Find the (bracket)';
    const term = '('; // This would break a raw RegExp constructor

    expect(() => pipe.transform(text, term)).not.toThrow();
    const result = pipe.transform(text, term) as string;
    expect(result).toContain('<mark class="highlight">(</mark>');
  });
});
