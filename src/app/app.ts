import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart-service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, RouterModule],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
    constructor(public cartService : CartService, private router: Router, private route: ActivatedRoute){}
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

    } 
}