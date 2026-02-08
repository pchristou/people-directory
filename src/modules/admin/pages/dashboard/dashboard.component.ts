import { Component, OnInit } from '@angular/core';
import {TypeaheadComponent} from '@shared/components/typeahead/typeahead.component';
import { TranslocoPipe } from "@jsverse/transloco";
import { User } from "@shared/models/user.model";
import { AdminActions } from "../../store/actions/admin.actions";
import { Store } from "@ngrx/store";
import { GlobalState } from "../../store/admin.state";
import { selectUserSectionLoading, selectUsers } from "../../store/selectors/admin.selectors";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { HighlightPipe } from "@shared/pipes/highlight.pipe";

@Component({
    selector: 'app-landing',
    imports: [
        TypeaheadComponent,
        TranslocoPipe,
        AsyncPipe,
        HighlightPipe
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true
})
export class DashboardComponent implements OnInit {

    isLoading$!: Observable<boolean>;
    users$!: Observable<User[]>;
    // Note that if the app grows and complexity increases, we can introduce a facadeService so only services
    // interact with the store instead of a component directly injecting the store
    constructor(private store: Store<GlobalState>) {}

    ngOnInit(): void {
        // Select the results from the nested state we built earlier
        this.isLoading$ = this.store.select(selectUserSectionLoading);
        this.users$ = this.store.select(selectUsers);
    }

    onSearch(term: string) {
        this.store.dispatch(AdminActions.searchUsers({ searchTerm: term }));
    }

    onUserSelected(user: User) {
        this.store.dispatch(AdminActions.userSelected({ selectedUser: user }));
    }
}
