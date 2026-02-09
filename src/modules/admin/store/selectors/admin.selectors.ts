import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from "../reducers/admin.reducer";

// if the app grew and the user section had more pages, we could have a dedicated user.selectors but overkill for now
export const selectAdminState = createFeatureSelector<AdminState>('admin');

// User section slice
export const selectUserSection = createSelector(
    selectAdminState,
    (state) => state.userSection
);

// Result from the most recent search
export const selectUsers = createSelector(
    selectUserSection,
    (userSection) => userSection.userResults
);

// Currently selected users
export const selectSelectedUsers = createSelector(
    selectUserSection,
    (userSection) => userSection.selectedUsers
);

// Loading state of user section
export const selectUserSectionLoading = createSelector(
    selectUserSection,
    (userSection) => userSection.loading
);
