import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  
  showLogout:boolean;

  title = 'UCaaS Platform Transformation ';

  constructor(private router:Router,private authService:AuthService){

  }

  ngOnInit() {
    this.authService.showLogout.subscribe(showLogout => this.showLogout = showLogout);
  }

  logout(){
    this.authService.setShowLogout(false);
    this.router.navigate(["/"]);
    
  }

}



