import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart-service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from './services/local-storage-service';
import { Helper } from './services/helper';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, RouterModule],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
    constructor(private helper : Helper, public cartService : CartService, private router: Router, private route: ActivatedRoute, private localStorageService : LocalStorageService){}
    protected readonly title = signal('trainings-front-app');
 
    showLayout = true;

    ngOnInit() {
        //get if this route should be with or without navbar and footer
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                let currentRoute = this.route.firstChild;

                while (currentRoute?.firstChild) {
                    currentRoute = currentRoute.firstChild;
                }

                this.showLayout = !currentRoute?.snapshot.data?.['noLayout'];
        });

        /*
        // if this a browser and not connected
        if(this.helper.isBrowser() && !this.localStorageService.getUserFromLocalStorage()){
            console.log("i got triggered old tech");
            this.router.navigate(['/login']);
        }
        */
    }

    
    //handle logout
    onLogoutClick(){
        this.localStorageService.logout();
        this.router.navigate(['/login']);
    }
}