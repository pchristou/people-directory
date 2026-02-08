import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectActiveUser = createSelector(
    selectUserState,
    (state: UserState) => state.selectedUser
);

export const selectActiveUserName = createSelector(
    selectActiveUser,
    (user) => user ? `${user.fullName}` : 'No User Selected'
);
