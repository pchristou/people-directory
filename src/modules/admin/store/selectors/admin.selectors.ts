import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from "../reducers/admin.reducer";

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectUserSection = createSelector(
    selectAdminState,
    (state) => state.userSection
);

export const selectUsers = createSelector(
    selectUserSection,
    (userSection) => userSection.userResults
);

export const selectUserSectionLoading = createSelector(
    selectUserSection,
    (userSection) => userSection.loading
);
