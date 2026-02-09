import { userReducer, UserState } from './user.reducer';
import { AdminActions } from '../actions/admin.actions';
import { User } from '@shared/models/user.model';

describe('UserReducer', () => {
    const initialState: UserState = {
        selectedUser: null,
        selectedUsers: [],
        userResults: [],
        loading: false,
        error: null,
    };

    const mockUser: User = { id: '1', firstName: 'Foo', lastName: 'Bar' } as unknown as User;

    it('should return the default state on unknown action', () => {
        const action = { type: 'Unknown' };
        const state = userReducer(initialState, action as any);

        expect(state).toBe(initialState);
    });

    describe('selectUser action', () => {
        it('should add a user to selectedUsers if they do not exist', () => {
            const action = AdminActions.selectUser({ selectedUser: mockUser });
            const state = userReducer(initialState, action);

            expect(state.selectedUser).toEqual(mockUser);
            expect(state.selectedUsers.length).toBe(1);
            expect(state.selectedUsers).toContain(mockUser);
            expect(state.userResults).toEqual([]);
        });

        it('should NOT add a duplicate user to selectedUsers', () => {
            const stateWithUser: UserState = {
                ...initialState,
                selectedUsers: [mockUser]
            };

            const action = AdminActions.selectUser({ selectedUser: mockUser });
            const state = userReducer(stateWithUser, action);

            expect(state.selectedUsers.length).toBe(1); // Still 1
        });

        it('should clear selectedUser and results if selectedUser is null', () => {
            const stateWithData: UserState = {
                ...initialState,
                selectedUser: mockUser,
                userResults: [mockUser]
            };

            const action = AdminActions.selectUser({ selectedUser: null });
            const state = userReducer(stateWithData, action);

            expect(state.selectedUser).toBeNull();
            expect(state.userResults).toEqual([]);
        });
    });

    describe('searchUsers actions', () => {
        it('should set loading to true on searchUsers', () => {
            const action = AdminActions.searchUsers({ searchTerm: 'test' });
            const state = userReducer(initialState, action);

            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should set results and stop loading on searchUsersSuccess', () => {
            const results = [mockUser];
            const action = AdminActions.searchUsersSuccess({ results });
            const state = userReducer({ ...initialState, loading: true }, action);

            expect(state.userResults).toEqual(results);
            expect(state.loading).toBe(false);
        });

        it('should set error on searchUsersFailure', () => {
            const error = 'API Error';
            const action = AdminActions.searchUsersFailure({ error });
            const state = userReducer({ ...initialState, loading: true }, action);

            expect(state.error).toBe(error);
            expect(state.loading).toBe(false);
        });
    });

    describe('clearSelection / duplicateUserSelected', () => {
        it('should clear selectedUser and clear results when duplicateUserSelected', () => {
            const stateWithData: UserState = {
                ...initialState,
                selectedUser: mockUser,
                userResults: [mockUser]
            };

            const action = AdminActions.duplicateUserSelected({ message: 'Error' });
            const state = userReducer(stateWithData, action);

            expect(state.selectedUser).toBeNull();
            expect(state.userResults).toEqual([]);
        });
    });
});
