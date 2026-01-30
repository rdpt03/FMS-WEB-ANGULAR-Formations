import { Routes } from '@angular/router';
import { TrainingComponent } from './components/training-component/training-component';
import { Home } from './components/home/home';
import { RegisterFormComonent } from './components/register-form-component/register-form-component';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { CartComponent } from './components/cart-component/cart-component';

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
    },
    {
        path: 'cart', 
        component:CartComponent
    },
    {
        path: '**',
        component: PageNotFound
    }
];
