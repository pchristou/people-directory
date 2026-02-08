import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('../modules/admin/admin.routes').then(m => m.ADMIN_ROUTES) // lazy load
    },
    { path: '', redirectTo: 'admin', pathMatch: 'full' }
];
