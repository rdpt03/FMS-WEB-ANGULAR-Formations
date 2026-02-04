import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Training } from '../../models/training';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { ApiService } from '../../services/api-service';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage-service';
import { User } from '../../models/user';

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
    //training list
    listTrainings : TrainingWithQuantity[] | undefined;
    //possible errors
    error : any = null;

    //var to check if i m admin
    adminConnected = false;

    //search tool (not used)
    filteredTrainings : TrainingWithQuantity[] | undefined;
    searchText : string = "";

    //trainings list as observable
    trainings$!: Observable<Training[]>;


    constructor(private apiService : ApiService, private cartService : CartService, private localStorageService : LocalStorageService) { }
    

    ngOnInit() {
        //get trainings
        this.trainings$ = this.apiService.getTrainings();

        //get user
        const user = this.localStorageService.getUserFromLocalStorage();

        //check if is user admin
        this.adminConnected = user?.role.includes('ADMIN') ?? false;
    }


    onAddToCart(training:TrainingWithQuantity){
        this.cartService.addTraining(training, training.quantity);
    }


    onSearchTextChange(value: string) {
        console.log("searchText changed to:", value);
    }
}
