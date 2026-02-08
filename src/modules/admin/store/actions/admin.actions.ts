import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from "@shared/models/user.model";
import { UserState } from "../reducers/user.reducer";

export const AdminActions = createActionGroup({
    source: 'Dashboard Component',
    events: {
        // 1. The Trigger: Dispatched from the component on input
        'Search Users': props<{ searchTerm: string }>(),

        // 2. The Success: Dispatched by the Effect after API returns data
        'Search Users Success': props<{ results: UserState['userResults'] }>(),

        // 3. The Failure: Dispatched by the Effect if the API crashes
        'Search Users Failure': props<{ error: string }>(),

        // 4. The Selection: When the user clicks an item in the list
        'User Selected': props<{ selectedUser: UserState['selectedUser'] }>(),

        // 5. The Reset: To clear the list and the selection
        'Clear Selection': emptyProps(),
    }
});
