import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Training } from '../../models/training';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { ApiService } from '../../services/api-service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

interface TrainingWithQuantity extends Training {
    quantity: number;
}


@Component({
    selector: 'app-training-component',
    imports: [CommonModule, FormsModule],
    templateUrl: './training-component.html',
    styleUrl: './training-component.css',
})
export class TrainingComponent implements OnInit{
    //user
    user : User;
    //training list
    listTrainings : TrainingWithQuantity[] | undefined;

    //var to check if i m admin
    adminConnected = false;

    //search tool (not used)
    filteredTrainings : TrainingWithQuantity[] | undefined;
    searchText : string = "";

    //trainings list as observable
    trainings$!: Observable<Training[]>;

    searchText$ = new BehaviorSubject<string>('');

    
    constructor(private apiService : ApiService, private cartService : CartService, private localStorageService : LocalStorageService, private router : Router) { 
        this.user = localStorageService.getUserFromLocalStorage() ?? new User();
    }
    

    ngOnInit() {
    this.trainings$ = combineLatest([
        this.apiService.getTrainings().pipe(
            map(trainings => trainings.map(t => ({ ...t, quantity: 1 })))
        ),
        this.searchText$
    ]).pipe(
        map(([trainings, search]) => trainings.filter(t => t.name.toLowerCase().includes(search.toLowerCase())))
    );
}


    onAddToCart(training:TrainingWithQuantity){
        this.cartService.addTraining(training, training.quantity);
    }


    onSearchTextChange(value: string) {
        this.searchText$.next(value);
    }

    onCreateClick(){
        if(this.user.isAdmin()){
            this.router.navigate(['/training/create']);
        }
    }
    
    onEditClick(training : Training){
        if(this.user.isAdmin()){
            this.router.navigate(['/training/edit/'+training.id]);
        }
    }
    

    onDeleteClick(training:Training){
        //if not admin stop
        if(!this.user.isAdmin()){return;}
        
        //delete
        this.apiService.delTraining(this.user, training);

        //refresh
        this.trainings$ = this.apiService.getTrainings();

    }
}
