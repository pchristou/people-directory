import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "@shared/models/user.model";

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Input({ required: true }) user!: User;
}
