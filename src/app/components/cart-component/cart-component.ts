import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-cart-component',
    imports: [CommonModule, FormsModule],
    templateUrl: './cart-component.html',
    styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit{
    constructor(private cartService : CartService, private router : Router) { }
    
    ngOnInit(): void {
    }

    getCartList(){
        return this.cartService.getCart();
    }

    onEditToCart(cart:Object){
        console.log('bruh');
        //this.cartService.addCart(cart);
        //this.router.navigateByUrl('/cart');
    }
}
