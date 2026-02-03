import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Training } from '../../models/training';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { Observable } from 'rxjs';

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
    listTrainings : TrainingWithQuantity[] | undefined;
    error : any = null;
    filteredTrainings : TrainingWithQuantity[] | undefined;
    searchText : string = "";

    trainings$!: Observable<Training[]>;

    constructor(private apiService : ApiService, private cartService : CartService, private router : Router) { }
    

    


    ngOnInit() {
         this.trainings$ = this.apiService.getTrainings(); // retorna Observable
    }



    onAddToCart(training:TrainingWithQuantity){
        this.cartService.addTraining(training, training.quantity);
    }


    onSearchTextChange(value: string) {
        console.log("searchText changed to:", value);
    }
}
