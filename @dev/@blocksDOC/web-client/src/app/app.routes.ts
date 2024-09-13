import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/blocks-doc/blocks-doc.component'),
    },
    {
        path: 'create-instance',
        loadComponent: () => import('./pages/generate-instance/generate-instance.component'),
    }
];
