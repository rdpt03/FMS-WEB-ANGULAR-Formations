
import { Routes } from '@angular/router';
import { TrainingComponent } from './components/training-component/training-component';
import { Home } from './components/home/home';
import { RegisterFormComonent } from './components/register-form-component/register-form-component';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { CartComponent } from './components/cart-component/cart-component';
import { LoginFormComponent } from './components/login-form-component/login-form-component';
import { EditTrainingComponent } from './components/edit-training-component/edit-training-component';
import { adminGuard } from './guards/admin-guard';
import { userGuard } from './guards/user-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [userGuard]
    },
    {
        path: 'trainings',
        component: TrainingComponent,
        canActivate: [userGuard]
    },
    {
        path: 'register',
        component: RegisterFormComonent
    },
    {
        path: 'cart', 
        component:CartComponent,
        canActivate: [userGuard]
    },
    {
        path: 'login',
        component: LoginFormComponent,
        data: { noLayout: true }  
    },
    {
        path: 'training/create',
        component: EditTrainingComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'training/edit/:id',
        component: EditTrainingComponent,
        canActivate: [adminGuard]
    },
    {
        path: '**',
        component: PageNotFound
    }
];