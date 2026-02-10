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

    // =============== Users ===============    
    //get trainings list
    getUsers(){
        return this.http.get<User[]>(environment.host+"/users")
    }
    // =============== Trainings ===============    
    //get trainings list
    getTrainings(){
        return this.http.get<Training[]>(environment.host+"/trainings")
    }
    
    getTrainingsByKeyword(keyword : string){
        return this.http.get<Training[]>(environment.host+"/trainings?q="+keyword)
    }


    //get a specific training by id
    getTraining(id : number){
        return this.http.get<Training>(environment.host+"/trainings/"+id)
    }

    delTraining(currentUser: User, training : Training): boolean | void {
        // verifica se o usuário é admin
        if (!currentUser.isAdmin()) {
            alert("Vous n'avez pas l'acces à cette fonctionnalité");
            return;
        }

        const confirmed = window.confirm("Vous êtes sur de supprimer cette formation?\n"+training.name);
        if (!confirmed) return; // se o usuário clicar em "Cancelar", não faz nada

        // envia a requisição DELETE
        this.http.delete(environment.host+'/trainings/'+training.id)
            .subscribe({
                next: () => {
                    ;
                },
                error: () => {
                    alert("Une erreur s'est produit, consultez la console!");
                    return;
                }
            });
        alert("Formation suprimmé avec succès!");  
    }


    createTraining(training: Training) {
        return this.http.post<Training>(environment.host + "/trainings", training);
    }

    editTraining(training : Training){
        return this.http.patch<Training>(environment.host + "/trainings/"+training.id, training)
    }


    
    // =============== Users ===============
    //check if the user exists
    checkUser(email: string, password: string) {
        // Return Observable, do NOT subscribe here
        return this.http.get<User[]>(
            environment.host + '/users?email='+email+'&password='+password,
        );
    }



}
