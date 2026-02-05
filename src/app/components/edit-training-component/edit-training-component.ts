    import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    import { Helper } from '../../services/helper';
    import { Training } from '../../models/training';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { ApiService } from '../../services/api-service';

    @Component({
        selector: 'app-edit-training-component',
        imports: [CommonModule, FormsModule],
        templateUrl: './edit-training-component.html',
        styleUrls: ['./edit-training-component.css'],

    })
    export class EditTrainingComponent {

        editingTraining : boolean = false;
        training : Training | undefined;

        //fields
        name : string = '';
        description : string = '';
        price : number = 0;
        constructor(private apiService : ApiService, private helper:Helper, private router : Router, private route : ActivatedRoute, private cdr: ChangeDetectorRef){}

        ngOnInit(){
            //check if is not browser then terminate if not
            if(!this.helper.isBrowser()){return;}

            //get the id from url
            let idStr : string | null = this.route?.snapshot?.paramMap?.get('id');

            //check if there's an id
            if(idStr && idStr !== '0'){
                //convert to int
                let idNum : number = +idStr;
                
                //set as editing
                this.editingTraining = true
                
                //get training
                this.apiService.getTraining(idNum).subscribe({
                    next: (resTraining: Training) => {
                        this.training = resTraining;   // guarda todo o objeto
                        this.name = resTraining.name;
                        this.description = resTraining.description;
                        this.price = resTraining.price;
                        // update all
                        this.cdr.detectChanges();
                        console.log("editing:", this.training);
                        
                        
                    }
                });
                
            }
        }

        onCancelClick(){
            if(this.helper.isBrowser()){
                this.router.navigate(['/trainings']);
            }
        }

        onCreateClick(){
            console.log(this.training)
            //create the training
            this.training = new Training(0,this.name, this.description, this.price);

            //insert into backend
            this.apiService.createTraining(this.training).subscribe({
                next:(res : Training) => {
                    alert("Formation crée avec succes : "+res?.name);
                    //return back to trainings
                    this.onCancelClick();
                } 
            }); 
        }


        onModifyClick(){
            //is there s a training 
            if(this.training){
                //update object 
                this.training.name = this.name;
                this.training.description = this.description;
                this.training.price = this.price;
                
                //send to db
                this.apiService.editTraining(this.training).subscribe();

                //return back to trainings
                this.onCancelClick();
            }

        }
    }
