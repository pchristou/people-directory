import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from "@jsverse/transloco";

/**
 * Acts as an 'orchestrator'. Just load to the correct app module/section.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('People Directory');

  constructor(private translocoService: TranslocoService) {}

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
