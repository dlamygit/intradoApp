import { Component, OnInit, ViewChild  } from '@angular/core';
import { Build } from 'src/app/Model/Build';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import Swal from 'sweetalert2';
import { map, take } from 'rxjs/operators';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { TowerAPIService } from 'src/app/service/tower-api.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute, private buildsService:BuildsService,private tower_api_service:TowerAPIService) { }
  showLogout=true;

  pageInc = 1; pageSizeInc = 12; 
  pageCom = 1; pageSizeCom = 12; 

  incompleted_builds:Build[];
  completed_builds:Build[];

   //Review how this work
   @ViewChild("buildsTab", { static: true, read: NgbTabset }) 
   buildsTab: NgbTabset;
 
  async ngOnInit() {

    this.buildsService.buildsN.subscribe(builds => this.incompleted_builds = builds.filter(build => build.status != 'Completed'));
    this.buildsService.buildsN.subscribe(builds => this.completed_builds = builds.filter(build => build.status == 'Completed'));

    const params = await this.route.paramMap
        .pipe(
            map((params: ParamMap) => ({ tabName: params.get("tabName") })),
            take(1) // <-- force to complete
        ).toPromise();
    this.buildsTab.select(`${params.tabName}`);
  }

  onTabChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'incomplete_builds') {
      this.router.navigate(["builds", "incomplete_builds"]);    
    } else if ($event.nextId === 'complete_builds') {
      this.router.navigate(["builds", "complete_builds"]);    

    }
  }
  
  newCustomer() {
    this.router.navigate(["build_config","0"]);    
  }

  progressBarTypeByStatus(status:string){
    if(status=="Canceled"){
      return "warning";
    }
    else if(status=="Failed"){
      return "danger";
    }
    else if(status=="Completed"){
      return "success";
    }
    else{
      return "primary";
    }
  }
  edit(build_id:string){
     this.router.navigate(["build_config", build_id]);    
  }

  details(build_id:string){
    this.router.navigate(["build_config", build_id]);    
  }

  delete(build_id:string){

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
        this.buildsService.deleteBuild(build_id);
        Swal.fire(
          'Saved!',
          'Build deleted',
          'success'
        )
      }
    })

  }

  logsCompleted(build_id:string){
    this.router.navigate(["logs",build_id,"execution"]);    
  }

  runValidation(build_id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "Build Provisioning validation process will start",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start validation process'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(["logs",build_id,"validation"]);
        Swal.fire(
          'Started!',
          'Build provisioning validation process started sucessfully',
          'success'
        )
      }
    })
   
  }

  runBuild(build_id:string){

    Swal.fire({
      title: 'Are you sure?',
      text: "VM Provisioning build process will start",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start provisioning process'
    }).then((result) => {
      if (result.value) {
        const customerName = (this.buildsService.getBuild(build_id)).customer.name;
        const jobId = 9;
        this.tower_api_service.startJob(jobId, customerName)
        .subscribe((data) => {
          Swal.fire(
            'Started!',
            'VM provisioning build started sucessfully',
            'success'
          );          
          console.log(data);
          this.router.navigate(["logs",build_id,"execution"]);  

        }, err => {
          Swal.fire(
            'VM Provisioning process failed',
            err.error.detail,
            'error'
          );
          console.log(err);
        });
      }
    })
  }


}
