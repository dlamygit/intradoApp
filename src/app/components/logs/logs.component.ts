import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Logs } from 'src/app/Model/Logs';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { map, take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TowerAPIService } from 'src/app/service/tower-api.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})

export class LogsComponent implements OnInit {

  currentLog:Logs;
  currentBuildStatus:string;
  current_build_id:string;
  selectedTab:string; 

  //Review how this work
  @ViewChild("logsTab", { static: true, read: NgbTabset }) 
  logsTab: NgbTabset;

  //TODO Review how to mix both route params usage.
  constructor(private router:Router,private route: ActivatedRoute,private buildsService:BuildsService,private tower_api_service:TowerAPIService) {     
    this.route.params.subscribe((params) => {
      this.current_build_id = params['id'] as string;
      this.currentLog = this.buildsService.getLogs(this.current_build_id);
      this.currentBuildStatus = this.buildsService.getBuildStatus(this.current_build_id);      
    });
  }

  onTabChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'validation') {
      this.router.navigate(["logs",this.current_build_id, "validation"]);    
    } else if ($event.nextId === 'execution') {
      this.router.navigate(["logs",this.current_build_id,"execution"]);    

    }
  }

  async ngOnInit() {
    const params = await this.route.paramMap
        .pipe(
            map((params: ParamMap) => ({ tabName: params.get("tabName") })),
            take(1) // <-- force to complete
        ).toPromise();
    this.logsTab.select(`${params.tabName}`);
  }

  back(){
    window.history.back();
  }

  lowLevelLogsValidation(logs_id:string){
    console.log("TODO: Make low level logs component for validation logs")
  }

  lowLevelLogsExecution(logs_id:string){
    console.log("TODO: Make low level logs component for execution logs")
  }

  cancelValidation(){
    console.log("TODO: Make cancel valditaion functionality")    
  }

  cancelExecution(){
    console.log("TODO: Make cancel execution functionality")    
  }

  run(build_id:string){
    
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
        this.buildsService.runBuild(build_id);
        
        this.tower_api_service.startJob(9,this.buildsService.getBuild(this.current_build_id).customer.name)
        .subscribe((data) => {
          Swal.fire(
            'Started!',
            'VM provisioning build started sucessfully',
            'success'
          );          
          console.log(data);
          this.logsTab.select("execution");

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
