import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {TypeaheadComponent} from '@shared/components/typeahead/typeahead.component';
import { TranslocoPipe } from "@jsverse/transloco";
import { User } from "@shared/models/user.model";
import { AdminActions } from "../../store/actions/admin.actions";
import { Store } from "@ngrx/store";
import { GlobalState } from "../../store/admin.state";
import { selectUserSectionLoading, selectUsers, selectSelectedUsers } from "../../store/selectors/admin.selectors";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { HighlightPipe } from "@shared/pipes/highlight.pipe";
import { ToastContainerComponent } from "@shared/components/toast-container/toast-container.component";
import { ContactCardListComponent } from "../../components/contact-card-list/contact-card-list.component";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-landing',
    imports: [
        TypeaheadComponent,
        TranslocoPipe,
        AsyncPipe,
        HighlightPipe,
        ToastContainerComponent,
        ContactCardListComponent,
        RouterLink,
        RouterOutlet
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

    isLoading$!: Observable<boolean>;
    users$!: Observable<User[]>;
    selectedUsers$!: Observable<User[]>;
    // Note that if the app grows and complexity increases, we can introduce a facadeService so only services
    // interact with the store instead of a component directly injecting the store
    constructor(private store: Store<GlobalState>) {}

    ngOnInit(): void {
        // Select the results from the nested state we built earlier
        this.isLoading$ = this.store.select(selectUserSectionLoading);
        this.users$ = this.store.select(selectUsers);
        this.selectedUsers$ = this.store.select(selectSelectedUsers);
    }

    onSearch(term: string) {
        this.store.dispatch(AdminActions.searchUsers({ searchTerm: term }));
    }

    onUserSelected(user: User) {
        this.store.dispatch(AdminActions.selectUserAttempt({ selectedUser: user }));
    }
}
