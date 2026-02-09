import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage-service';
import { User } from '../models/user';

export const userGuard: CanActivateFn = (route, state) => {
    //if not a browser, not a block
    if (typeof window === 'undefined') {
        return true;
    }
    
    
    //inject local storage
    const localStorageService : LocalStorageService = inject(LocalStorageService);
    const router = inject(Router); //inject router

    //get user
    const user : User | null  = localStorageService.getUserFromLocalStorage() ?? null;

    //if the user is connected and is user
    if (!!user){
        return true;
    }
    else{
        //redirect to login page
        console.log("dog guard got triggered");
        return router.parseUrl("/login")
    }
};
