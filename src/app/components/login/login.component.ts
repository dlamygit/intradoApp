import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/service/auth.service';

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
    if(this.authService.authenticate(user)){
      this.router.navigate(["builds","incomplete_builds"]);
    }
    else{
      this.invalidUser = true;
    }    
  }
}
