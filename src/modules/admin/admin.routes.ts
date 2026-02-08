import { Routes } from '@angular/router';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent, // The "Shell" that holds the list
        children: [
            {
                path: 'new',
                component: UserFormComponent // The form that appears inside the shell
            },
            {
                path: 'edit/:id',
                component: UserFormComponent // Reuse the same form for editing
            }
        ]
    }
];
