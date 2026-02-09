import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserState } from "../reducers/user.reducer";
import { User } from "@shared/models/user.model";

export const AdminActions = createActionGroup({
    source: 'Dashboard Component',
    events: {
        // Dispatched when searching for users
        'Search Users': props<{ searchTerm: string }>(),

        // Dispatched by the Effect after API returns data
        'Search Users Success': props<{ results: User[] }>(),

        // Dispatched by the Effect if the API errors and, we fail to retrieve user results
        'Search Users Failure': props<{ error: string }>(),

        // When the user clicks a result item in the list
        'Select User': props<{ selectedUser: User | null }>(),

        // Dispatched when attempting to add a user
        'Select User Attempt': props<{ selectedUser: User }>(),

        // When the user has already been added
        'Duplicate User Selected': props<{ message: string }>(),

        // Clear the results and input
        'Clear Selection': emptyProps(),

        // When the user clicks "Create" in the form
        'Create User': props<{ user: User }>(),

        // Dispatched when the API successfully saves the user
        'Create User Success': props<{ user: User }>(),

        // Dispatched if the save fails (e.g., server error)
        'Create User Failure': props<{ error: string }>()
    }
});
