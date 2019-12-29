import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Logs } from 'src/app/Model/Logs';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})

export class LogsComponent implements OnInit {

  currentLog:Logs;
  currentBuildStatus:String;
  selectedTab:string; 

  //Review how this work
  @ViewChild("logsTab", { static: true, read: NgbTabset }) 
  logsTab: NgbTabset;

  //TODO Review how to mix both route params usage.
  constructor(private router:Router,private route: ActivatedRoute,private buildsService:BuildsService) {     
    this.route.params.subscribe((params) => {
      const build_id = params['id'] as string;
      this.currentLog = this.buildsService.getLogs(build_id);
      this.currentBuildStatus = this.buildsService.getBuildStatus(build_id);      
    });
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

  run(){
    console.log("TODO: Make call to job_template")    
  }

}
