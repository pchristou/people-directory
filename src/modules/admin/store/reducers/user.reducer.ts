import { AdminActions } from "../actions/admin.actions";
import { User } from "@shared/models/user.model";
import { createReducer, on } from "@ngrx/store";
import { AdminEffects } from "../effects/admin.effects";

export interface UserState {
    selectedUser: User | null;
    selectedUsers: User[];
    userResults: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    selectedUser: null,
    selectedUsers: [],
    userResults: [],
    loading: false,
    error: null,
};

export const userReducer = createReducer(
    initialState,
    on(AdminActions.addUser, (state, { selectedUser }) => {

        if (!selectedUser) {
            return {
                ...state,
                selectedUser: null,
                userResults: []
            };
        }

        const exists = state.selectedUsers.some(u => u.id === selectedUser?.id);
        return {
            ...state,
            selectedUser: selectedUser,
            userResults: [],
            selectedUsers: exists
                ? state.selectedUsers
                : [...state.selectedUsers, selectedUser]
        }
    }),
    on(AdminActions.clearSelection, AdminActions.duplicateUserSelected, (state) => ({
        ...state,
        selectedUser: null,
        userResults: []
    })),
    on(AdminActions.searchUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AdminActions.searchUsersSuccess, (state, { results }) => ({
        ...state,
        userResults: results!,
        loading: false
    })),
    on(AdminActions.searchUsersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
