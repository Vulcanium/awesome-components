import { Routes } from '@angular/router';
import { CandidatesService } from './services/candidates.service';

export const REACTIVE_STATE_ROUTES: Routes = [
    {
        path: 'candidates', // Equivalent to 'reactive-state/candidates'
        loadComponent: () => import('./components/candidate-list/candidate-list').then(component => component.CandidateList),
        providers: [CandidatesService]
    },
    {
        path: 'candidates/:id', // Equivalent to 'reactive-state/candidates/:id'
        loadComponent: () => import('./components/single-candidate/single-candidate').then(component => component.SingleCandidate),
        providers: []
    },
    {
        path: '', // Equivalent to 'reactive-state'
        pathMatch: 'full',
        redirectTo: 'candidates'
    }
];