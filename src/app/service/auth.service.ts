import { Injectable } from '@angular/core';
import { User } from '../Model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users:User[];

  constructor() {

    var userDemo = new User();
      userDemo.username = 'demo';
      userDemo.password = 'demo';
    this.users = new Array();
    this.users.push(userDemo);
    
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
