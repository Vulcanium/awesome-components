import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'social-media', loadChildren: () => import('./social-media/social-media.routes').then(childRoutes => childRoutes.SOCIAL_MEDIA_ROUTES) },
    { path: '**', redirectTo: 'social-media' } // Any unknown route
];
