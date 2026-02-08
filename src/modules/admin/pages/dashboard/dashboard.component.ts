import { Component } from '@angular/core';
import {TypeaheadComponent} from '@shared/components/typeahead/typeahead.component';
import { LookupProvider } from "@shared/models/lookup-provider.model";
import { UserService } from "../../services/user.service";
import { TranslocoPipe } from "@jsverse/transloco";

@Component({
    selector: 'app-landing',
    imports: [
        TypeaheadComponent,
        TranslocoPipe
    ],
    providers: [
        { provide: LookupProvider, useClass: UserService }
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true
})
export class DashboardComponent {
    // PC TODO, necessary?
    onTypeaheadSubmit(searchTerm: string) {
        console.log(searchTerm)
    }
}
