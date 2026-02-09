import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, of, take, tap } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LookupProvider } from "@shared/models/lookup-provider.model";
import { AdminActions } from "../actions/admin.actions";
import { Store } from "@ngrx/store";
import { selectSelectedUsers } from "../selectors/admin.selectors";
import { ToastService } from "@shared/services/toast.service";
import { DEBOUNCE_DELAY, MIN_CHAR_SEARCH } from "@shared/constants";

@Injectable()
export class AdminEffects {
    private actions$ = inject(Actions);
    private lookupProvider = inject(LookupProvider);
    private store = inject(Store);
    private toastService = inject(ToastService);

    // This effect handles the "User Search" logic specifically
    searchUsers$ = createEffect(() => {
        return this.actions$.pipe(
            // Listen for the search trigger
            ofType(AdminActions.searchUsers),

            // Debounce here so the API isn't hammered as the user types
            debounceTime(DEBOUNCE_DELAY),
            distinctUntilChanged(),

            switchMap(({ searchTerm }) => {
                // Handle empty states immediately
                if (!searchTerm || searchTerm.trim().length < MIN_CHAR_SEARCH) {
                    return of(AdminActions.searchUsersSuccess({ results: [] }));
                }

                return this.lookupProvider.search(searchTerm).pipe(
                    // Dispatch success to update the userSection in the reducer
                    map((results) => AdminActions.searchUsersSuccess({ results })),

                    // Dispatch failure so we can show an error in the UI
                    catchError((error) =>
                        of(AdminActions.searchUsersFailure({ error: error.message }))
                    )
                );
            })
        );
    });

    userSelected$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.addUserAttempt),
            // 1. Get the current list of users from the Store
            concatMap((action) =>
                this.store.select(selectSelectedUsers).pipe(
                    take(1),
                    map(currentUsers => ({
                        selectedUser: action.selectedUser,
                        exists: currentUsers.some(u => u.id === action.selectedUser?.id)
                    }))
                )
            ),
            map(({ selectedUser, exists }) => {
                if (exists) {
                    // 2. Pivot: Dispatch a warning action instead
                    // You can have a separate effect listening for this to show a Toast
                    return AdminActions.duplicateUserSelected({ message: selectedUser!.fullName });
                }

                // 3. Proceed: Do nothing or dispatch a "Confirmed" action
                // Note: If you do this, your Reducer should listen to a 'Add User Confirmed' action
                return AdminActions.addUser({ selectedUser: selectedUser! });
            })
        )
    );

    showDuplicateWarning$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AdminActions.duplicateUserSelected),
                tap(({ message }) => {
                    // Perform the side effect
                    this.toastService.show(
                        `${message} already added.`,
                        'warning'
                    );
                })
            ),
        { dispatch: false } // prevents NgRx from expecting a return action
    );

    showSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AdminActions.addUser),
                tap(({ selectedUser }) => {
                    this.toastService.show(`Added ${selectedUser!.firstName} successfully.`);
                })
            ),
        { dispatch: false }
    );
}
