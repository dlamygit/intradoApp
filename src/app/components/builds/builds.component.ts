import { Component, OnInit  } from '@angular/core';
import { Build } from 'src/app/Model/Build';
import { Router } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import Swal from 'sweetalert2';

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

    this.buildsService.buildsN.subscribe(builds => this.incompleted_builds = builds.filter(build => build.status != 'Completed'));
    this.buildsService.buildsN.subscribe(builds => this.completed_builds = builds.filter(build => build.status == 'Completed'));

  }

  newCustomer() {
    this.router.navigate(["build_config","0"]);    
  }

  edit(id:string){
     this.router.navigate(["build_config", id]);    
  }

  details(id:string){
    this.router.navigate(["build_config", id]);    
  }

  delete(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.buildsService.deleteBuild(id);
        Swal.fire(
          'Saved!',
          'Build deleted',
          'success'
        )
      }
    })

  }

  logsCompleted(id:string){
    this.router.navigate(["logs"]);    
  }

  runBuild(id:string){
    this.buildsService.runBuild(id);
    this.router.navigate(["logs"]);    
  }


}
