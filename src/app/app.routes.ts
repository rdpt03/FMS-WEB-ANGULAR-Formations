import { Routes } from '@angular/router';
import { TrainingComponent } from './components/training-component/training-component';
import { Home } from './components/home/home';
import { RegisterFormComonent } from './components/register-form-comonent/register-form-comonent';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'trainings',
        component: TrainingComponent
    },
    {
        path: 'register',
        component: RegisterFormComonent
    }
];
