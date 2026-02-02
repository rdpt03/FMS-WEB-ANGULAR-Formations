export class Training {
    id : number;
    name : string;
    description : string;
    price : number;
    quantity : number; //this is just the initial quantity, not the quantity in stock and not the in-cart quantity

    constructor(id:number,name:string,description:string,price:number){
        this.id=id;
        this.name=name;
        this.description = description;
        this.price = price;
        this.quantity = 1;
    }
}
