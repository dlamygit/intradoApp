import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/service/auth.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router:Router, private authService:AuthService) { }

  user:User = new User();
  invalidUser = false;

  ngOnInit() {
  }

  onSubmit(user:User){
    
    console.log(user);
    if(this.authService.authenticate(user)){
      this.router.navigate(["builds","incomplete_builds"]);
    }
    else{
      this.invalidUser = true;
    }
    
  }
}
