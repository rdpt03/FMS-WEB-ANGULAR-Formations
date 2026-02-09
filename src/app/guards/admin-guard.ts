import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage-service';
import { User } from '../models/user';

export const adminGuard: CanActivateFn = (route, state) => {
    //inject local storage
    const localStorageService : LocalStorageService = inject(LocalStorageService);

    //get user
    const user : User | null  = localStorageService.getUserFromLocalStorage() ?? null;

    //if the user is connected and is admin
    return (!!user && user.isAdmin());
};
