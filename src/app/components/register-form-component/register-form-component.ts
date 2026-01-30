import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer';

@Component({
    selector: 'app-register-form-comonent',
    imports: [FormsModule],
    templateUrl: './register-form-component.html',
    styleUrl: './register-form-component.css',
})
export class RegisterFormComonent implements OnInit {
    customer: Customer = new Customer();

    ngOnInit(): void{}

    onSaveCustomer(customer : Customer){
        console.log(customer);
    }
}
