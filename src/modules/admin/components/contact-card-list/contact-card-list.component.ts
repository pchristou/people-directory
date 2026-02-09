import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "@shared/models/user.model";
import { ContactCardComponent } from '../contact-card/contact-card.component';

@Component({
  selector: 'app-contact-card-list',
  standalone: true,
  imports: [CommonModule, ContactCardComponent],
  templateUrl: './contact-card-list.component.html',
  styleUrl: './contact-card-list.component.scss'
})
export class ContactCardListComponent {
  @Input({ required: true }) users: User[] = [];
}
