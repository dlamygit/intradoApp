import { Injectable } from '@angular/core';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  users:User[];

  constructor() {

    var user1 = new User();
    user1.username = 'demo';
    user1.password = 'demo';
    this.users = new Array();
    this.users.push(user1);
   }

  authenticate(user:User) {
    var validUser = this.users.find(x => x.username === user.username && x.password === user.password);
    if (validUser){
      return true;
    }
    else{
      return false;
    }
}

}
