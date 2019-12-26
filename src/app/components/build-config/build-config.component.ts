import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Build } from 'src/app/Model/Build';

@Component({
  selector: 'app-build-config',
  templateUrl: './build-config.component.html',
  styleUrls: ['./build-config.component.css']
})

export class BuildConfigComponent implements OnInit {

  constructor(private router:Router,private buildsService:BuildsService) { 
   
  }

  currentBuild:Build;

  ngOnInit() {
    this.buildsService.currentBuild.subscribe(currentBuild => this.currentBuild = currentBuild);
  }

  back(){
    window.history.back();
  }

  validationLogs(){
    this.router.navigate(["logs"]);

  }
  
  validateProvision(){
    this.router.navigate(["logs"]);
  }

  save(id:string){
    console.log(id);
  }  

  
}
