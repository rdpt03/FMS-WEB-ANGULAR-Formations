import { Injectable } from '@angular/core';
import { Training } from '../models/training';
import { TrainingOnList } from '../models/trainingOnCart';


@Injectable({
    providedIn: 'root',
})

export class CartService {
    private cart : TrainingOnList[] = [];
    private readonly STORAGE_KEY = 'cart';
    
    constructor() {
        if (typeof localStorage !== 'undefined') {
            const storedCart = localStorage.getItem(this.STORAGE_KEY);
            if (storedCart) {
                this.cart = JSON.parse(storedCart);
            }
        }
    }



    /**
    * Adds a training to the cart.
    * If the training already exists, increments its quantity.
    * @param training - The Training object to add
    * @param quantity - Number of units to add (default is 1)
    */
    addTraining(training:Training, quantity:number){     
        // Check if the training already exists in the cart
        const existing = this.cart.find(
            art => art.training.id === training.id
        );

        if (existing) {
            // If it exists, increase the quantity
            existing.quantity += quantity;
        } else {
            // If it doesn't exist, add a new entry
            this.cart.push({ training, quantity });
        }

        //save to local storage also
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));

        //update
        const storedCart = localStorage.getItem(this.STORAGE_KEY);
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
    }

    removeTraining(training:number | Number | Training){
        //create var to store
        let trainingId : number;


        //transform into id
        if(training instanceof Training){
            trainingId = training.id;
        }
        else if(training instanceof Number ||  typeof training === 'number'){
            trainingId = (+training);
        }
        else{
            throw new Error('Invalid type for training');
        }


        //remove using filter function 
        this.cart = this.cart.filter(t => t.training.id !== trainingId)

        //save to local storage also
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
    }

    getCart(){
        return this.cart;
    }
}
