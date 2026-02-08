import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
}
