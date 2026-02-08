import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './user.reducer';

export const adminFeatureKey = 'admin';

export interface AdminState {
    userSection: UserState; // if new sections were added in future, we could add more slices
}

export const adminReducers: ActionReducerMap<AdminState> = {
    userSection: userReducer,
};
