import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslocoPipe } from "@jsverse/transloco";
import { Subject } from "rxjs";
import { APP_CONFIG } from "@shared/constants";

@Component({
    selector: 'app-typeahead',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslocoPipe
    ],
    templateUrl: './typeahead.component.html',
    styleUrl: './typeahead.component.scss',
})
export class TypeaheadComponent<T> implements OnInit, OnDestroy {
    @ContentChild('itemResultsTemplate') itemResultsTemplate?: TemplateRef<any>;

    @Input() results: T[] | null = [];
    @Input() loading: boolean | null = false;

    @Output() search = new EventEmitter<string>();
    @Output() selectResult = new EventEmitter<T>();
    @Output() submitted = new EventEmitter<string>();

    searchControl = new FormControl('');
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.searchControl.valueChanges
        .subscribe(term => {
            this.search.emit(term || '');
        });
    }

    // Getter allowing the consumer to highlight the match
    get searchTerm(): string {
        return this.searchControl.value || '';
    }

    get minSearch(): boolean {
        return this.searchControl.value!.length >= APP_CONFIG.SEARCH.MIN_CHARS;
    }

    selectItemResult(item: T): void {
        this.selectResult.emit(item);
        this.results = []
        this.searchControl.setValue('', { emitEvent: false });
    }

    submitSearch(): void {
        const term = this.searchControl.value?.trim();
        if (term) {
            this.search.emit(term);
            // close the dropdown on submit
            this.results = [];
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
