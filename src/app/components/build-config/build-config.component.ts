import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Build } from 'src/app/Model/Build';
import Swal from 'sweetalert2';


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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save changes!'
    }).then((result) => {
      if (result.value) {
        this.buildsService.updateBuild(id,this.currentBuild);
        Swal.fire(
          'Deleted!',
          'Changes applied',
          'success'
        )
      }
    })
    
  }  

  
}
