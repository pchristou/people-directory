import { Component } from '@angular/core';
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
  constructor(private translocoService: TranslocoService) {}

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
