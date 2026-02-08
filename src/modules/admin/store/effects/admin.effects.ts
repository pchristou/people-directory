import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LookupProvider } from "@shared/models/lookup-provider.model";
import { AdminActions } from "../actions/admin.actions"; // Assuming search actions are here

@Injectable()
export class AdminEffects {
    private actions$ = inject(Actions);
    private lookupProvider = inject(LookupProvider);

    // This effect handles the "User Search" logic specifically
    searchUsers$ = createEffect(() => {
        return this.actions$.pipe(
            // Listen for the search trigger
            ofType(AdminActions.searchUsers),

            // Debounce here so the API isn't hammered as the user types
            debounceTime(300),
            distinctUntilChanged(),

            switchMap(({ searchTerm }) => {
                // Handle empty states immediately
                if (!searchTerm || searchTerm.trim().length < 2) {
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
}
