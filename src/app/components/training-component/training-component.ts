import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Training } from '../../models/training';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';

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
    constructor(private apiService : ApiService, private cartService : CartService, private router : Router) { }
    

    ngOnInit(): void {
        this.apiService.getTrainings().subscribe({
            next : (data) => this.listTrainings = data,
            error : (err) => this.error = err.message,
            complete : () => this.error = null
        });
        /*
        const listTrainings = [
            {id:1, name:'Java',description:'Formation Java 8 pour 5 jours', price:1500 },
            {id:2, name:'DotNet',description:'Formation DotNet 3 jours', price:1000},
            {id:3, name:'Python',description:'Formation Python/Django 5 jours', price:1500}
        ];*/

        // Add quantityt attriute
        //this.listTrainings = listTrainings.map(t => ({ ...t, quantity: 1 }));
    }  


    onAddToCart(training:TrainingWithQuantity){
        this.cartService.addTraining(training, training.quantity);
    }


    onSearchTextChange(value: string) {
        console.log("searchText changed to:", value);
    }
}
