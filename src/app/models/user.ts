export class User {
    email : string;
    password : string;
    role : string[];

    constructor(email: string = '', password: string = '', role = []){
        this.email=email;
        this.password = password;
        this.role = role
        
    }

    isAdmin() {
        return this.role.some(r => r.toUpperCase().includes('ADMIN'));
    }

}
