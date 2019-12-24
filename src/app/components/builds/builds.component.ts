import { Component, OnInit } from '@angular/core';
import { Build } from 'src/app/Model/Build';
import { Router } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {

  constructor(private router:Router, private buildsService:BuildsService) { }
  showLogout=true;

  pageInc = 1; pageSizeInc = 12;
  pageCom = 1; pageSizeCom = 12;

  incomplete_builds:Build[];
  complete_builds:Build[];

  ngOnInit() {

    this.incomplete_builds = this.buildsService.getBuilds("incomplete_builds");
    this.complete_builds = this.buildsService.getBuilds("complete_builds");

  }

  newCustomer() {
    this.router.navigate(["build_config"]);    
  }

  edit(id:string){
     this.buildsService.setCurrentBuild(id,"incomplete_builds");
     this.router.navigate(["build_config"]);    

  }

  details(id:string){
    this.buildsService.setCurrentBuild(id,"complete_builds");
    this.router.navigate(["build_config"]);    
  }

  runBuild(id:string){
    this.buildsService.runBuild(id);
    this.router.navigate(["logs"]);    

  }


}
