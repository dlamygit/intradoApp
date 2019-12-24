import { Injectable } from '@angular/core';
import { User } from '../Model/user';
import { BehaviorSubject } from 'rxjs';

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

   private showLogoutSource = new BehaviorSubject<boolean>(false);
   showLogout = this.showLogoutSource.asObservable();

  setShowLogout(status:boolean){
    this.showLogoutSource.next(status);
  }      


  authenticate(user:User) {
    var validUser = this.users.find(x => x.username === user.username && x.password === user.password);
    if (validUser){
      this.setShowLogout(true);
      return true;
    }
    else{
      return false;
    }
}

}
