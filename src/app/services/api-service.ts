import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';
import { Training } from '../models/training';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http:HttpClient){}


    getTrainings(){
        return this.http.get<Training[]>(environment.host+"/trainings")
    }


    getTraining(id : number){
        return this.http.get<Training[]>(environment.host+"/trainings/"+id)
    }

    checkUser(email: string, password: string) {
        // Return Observable, do NOT subscribe here
        return this.http.get<User[]>(
            environment.host + '/users?email='+email+'&password='+password,
        );
    }



}
