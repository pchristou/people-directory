import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, of, take, tap } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LookupProvider } from "@shared/models/lookup-provider.model";
import { AdminActions } from "../actions/admin.actions";
import { Store } from "@ngrx/store";
import { selectSelectedUsers } from "../selectors/admin.selectors";
import { ToastService } from "@shared/services/toast.service";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslocoService } from "@jsverse/transloco";
import { APP_CONFIG } from "@shared/constants";

@Injectable()
export class AdminEffects {
    private actions$ = inject(Actions);
    private userService = inject(LookupProvider);
    private store = inject(Store);
    private toastService = inject(ToastService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private translocoService = inject(TranslocoService);

    createUser$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(AdminActions.createUser),
                // exhaustMap prevents double-submits if the user clicks 'Create' twice
                exhaustMap(({ user }) =>
                    (this.userService as UserService).saveUser(user).pipe(
                        map((savedUser) => AdminActions.createUserSuccess({ user: savedUser })),
                        tap(() => {
                            this.toastService.show('User created successfully!', 'success');
                            void this.router.navigate(['../'], { relativeTo: this.route });
                        }),
                        catchError(({ error }) => {
                            const exception = this.translocoService.translate(error.errorCode) ?? 'An error was encountered while creating the user.';
                            this.toastService.show(exception, 'error', false);
                            return of(AdminActions.createUserFailure({ error: exception }));
                        })
                    )
                )
            );
        }
    );

    searchUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.searchUsers),

            // Debounce here so the API isn't hammered as the user types
            debounceTime(APP_CONFIG.SEARCH.DEBOUNCE_DELAY),
            distinctUntilChanged(),

            switchMap(({ searchTerm }) => {

                if (!searchTerm || searchTerm.trim().length < APP_CONFIG.SEARCH.MIN_CHARS) {
                    return of(AdminActions.searchUsersSuccess({ results: [] }));
                }

                return this.userService.search(searchTerm).pipe(

                    map((results) => AdminActions.searchUsersSuccess({ results })),

                    catchError((error) =>
                        of(AdminActions.searchUsersFailure({ error: error.message }))
                    )
                );
            })
        );
    });

    userSelected$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.selectUserAttempt),

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
                    return AdminActions.duplicateUserSelected({ message: selectedUser!.fullName });
                }

                return AdminActions.selectUser({ selectedUser: selectedUser! });
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
                ofType(AdminActions.selectUser),
                tap(({ selectedUser }) => {
                    this.toastService.show(`Added ${selectedUser!.firstName} successfully.`);
                })
            ),
        { dispatch: false }
    );
}
