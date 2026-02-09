import { Routes } from '@angular/router';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { adminFeatureKey, adminReducers } from "./store/reducers/admin.reducer";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { AdminEffects } from "./store/effects/admin.effects";
import { UserService } from "./services/user.service";
import { LookupProvider } from "@shared/models/lookup-provider.model";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent, // The "Shell" that holds the list
        providers: [
            provideState(adminFeatureKey, adminReducers),
            provideEffects(AdminEffects),
            { provide: LookupProvider, useClass: UserService }
        ],
        children: [
            {
                path: 'new-user',
                component: UserFormComponent
            },
            {
                path: 'edit/:id',
                component: UserFormComponent // Future feature, edit users
            }
        ]
    }
];
