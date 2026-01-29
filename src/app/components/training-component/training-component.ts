import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Training } from '../../models/training';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-training-component',
    imports: [CommonModule, FormsModule],
    templateUrl: './training-component.html',
    styleUrl: './training-component.css',
})
export class TrainingComponent implements OnInit{
    listTrainings : Training[] | undefined;
    constructor(private cartService : CartService, private router : Router) { }
    
    ngOnInit(): void {
        this.listTrainings = [
            {id:1, name:'Java',description:'Formation Java 8 pour 5 jours', price:1500, quantity:1},
            {id:2, name:'DotNet',description:'Formation DotNet 3 jours', price:1000, quantity:1},
            {id:3, name:'Python',description:'Formation Python/Django 5 jours', price:1500, quantity:1}
        ];
    }

    onAddToCart(training:Training){
        this.cartService.addTraining(training);
        this.router.navigateByUrl('/cart');
    }
}
