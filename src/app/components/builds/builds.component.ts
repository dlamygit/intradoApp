import { Component, OnInit  } from '@angular/core';
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

  incompleted_builds:Build[];
  completed_builds:Build[];

  ngOnInit() {
    this.incompleted_builds = this.buildsService.getBuilds().filter(build => build.status != 'Completed');
    this.completed_builds = this.buildsService.getBuilds().filter(build => build.status == 'Completed');
        
  }

  newCustomer() {
    this.buildsService.updateCurrentBuild("0");
    this.router.navigate(["build_config"]);    
  }

  edit(id:string){
     this.buildsService.updateCurrentBuild(id);
     this.router.navigate(["build_config"]);    
  }

  details(id:string){
    this.buildsService.updateCurrentBuild(id);
    this.router.navigate(["build_config"]);    
  }

  runBuild(id:string){
    this.buildsService.runBuild(id);
    this.router.navigate(["logs"]);    
  }


}
