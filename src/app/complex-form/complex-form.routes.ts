import { Routes } from '@angular/router';
import { ComplexFormService } from './services/complex-form.service';

export const COMPLEX_FORM_ROUTES: Routes = [
    {
        path: '', // Equivalent to 'complex-form'
        loadComponent: () => import('./components/complex-form/complex-form').then(component => component.ComplexForm),
        providers: [ComplexFormService]
    }
];