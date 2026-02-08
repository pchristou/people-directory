import { AdminActions } from "../actions/admin.actions";
import { User } from "@shared/models/user.model";
import { createReducer, on } from "@ngrx/store";

export interface UserState {
    selectedUser: User | null;
    userResults: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    selectedUser: null,
    userResults: [],
    loading: false,
    error: null,
};

export const userReducer = createReducer(
    initialState,
    on(AdminActions.userSelected, (state, { selectedUser }) => ({
        ...state,
        selectedUser: selectedUser,
        userResults: []
    })),
    on(AdminActions.clearSelection, (state) => ({
        ...state,
        selectedUser: null
    })),
    on(AdminActions.searchUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AdminActions.searchUsersSuccess, (state, { results }) => ({
        ...state,
        userResults: results,
        loading: false
    })),
    on(AdminActions.searchUsersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
