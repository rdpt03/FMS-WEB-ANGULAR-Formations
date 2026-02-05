import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root',
})
export class Helper {
    /**
     * 
     * 
     * 
     */
    public isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }
}
