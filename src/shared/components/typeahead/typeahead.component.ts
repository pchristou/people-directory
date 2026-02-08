import { AsyncPipe } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from "rxjs";
import { LookupProvider } from "@shared/models/lookup-provider.model";
import { DEBOUNCE_DELAY } from "@shared/constants";
import { TranslocoPipe } from "@jsverse/transloco";

@Component({
    selector: 'app-typeahead',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        TranslocoPipe
    ],
    templateUrl: './typeahead.component.html',
    styleUrl: './typeahead.component.scss',
})
export class TypeaheadComponent implements OnInit {
    searchControl = new FormControl('');
    results$!: Observable<any[]>;

    @Output() submit = new EventEmitter<string>();

    constructor(private searchProvider: LookupProvider) {}

    ngOnInit(): void {
        this.results$ = this.searchControl.valueChanges.pipe(
            debounceTime(DEBOUNCE_DELAY),
            distinctUntilChanged(),
            filter(Boolean), // Filters falsy values
            filter(searchTerm => searchTerm.length >= 2),
            switchMap(searchTerm => this.searchProvider.search(searchTerm))
        );
    }

    // PC TODO necessary?
    submitSearch = (searchTerm: string): void => {
        this.submit.emit(searchTerm);
    }
}
