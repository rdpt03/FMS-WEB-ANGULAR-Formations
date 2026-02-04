import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage-service';


@Component({
    selector: 'app-login-form-component',
    imports: [FormsModule, CommonModule],
    templateUrl: './login-form-component.html',
    styleUrls: ['./login-form-component.css'],
})


export class LoginFormComponent implements OnInit {

    //user
    user: User = new User();
    
    //regex email 
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    constructor(private apiService : ApiService, public router : Router, private localStorageService : LocalStorageService) { }
    
    

    ngOnInit(): void{}

    
    onLogin(f: NgForm) {
        f.form.updateValueAndValidity();  // garante que ngModel está atualizado
        f.form.markAllAsTouched();       // garante validação visual   

        // 1️⃣ Email validation
        if (!this.emailRegex.test(this.user.email)) {
            alert("L'email n'est pas au bon format\nFormat : email@domain.com");
            return ;
        }

        // 2️⃣ Password validation (optional, e.g., min length) 
        if (!this.user.password || this.user.password.length < 4) {
            alert("Le mot de passe est trop court");
            return; 
        }


        // 4️⃣ Secure login via POST
        this.apiService.checkUser(this.user.email, this.user.password)
            .subscribe({
                next: (res : User[]) => {

                    //check if user is available or not
                    if(res.length > 0){
                        //add to the localStorage
                        console.log("aaaaaaaaaaaaaaaaa");
                        console.log("fuck",this.router);
                        this.localStorageService.setUserOnLocalStorage(res[0]);
                        this.router.navigate(['/trainings']);
                    }
                    else {
                        alert("Le compte n'existe pas");   
                    }
                },
            });
    }
}
