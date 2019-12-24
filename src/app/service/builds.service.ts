import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Build } from '../Model/Build';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BuildsService {

  saveCurrentBuild(id: string, build_type: string) {

    var builds:Build[];
    if(build_type=="incomplete_builds"){
       builds = this.incomplete_builds;
    }
    else{
       builds = this.complete_builds;
    }
    
    for(var i=0;i<builds.length;i++){

      if(builds[i].id==id){
         this.currentBuild.subscribe(currentBuild => builds[i] = currentBuild);

         console.log(builds[i]);
         console.log(this.currentBuild);
         if(build_type=="incomplete_builds"){
            this.incomplete_builds = builds;
            this.storage.set("incomplete_builds",this.incomplete_builds);
          }
          else{
            this.complete_builds = builds;
            this.storage.set("complete_builds",this.complete_builds);

          }
      }
    }



  }
  runBuild(id:string) {
    console.log("Runnning build: "+id);
  }

  
 
  private currentBuildSource = new BehaviorSubject<Build>(null);
  currentBuild = this.currentBuildSource.asObservable();

  incomplete_builds:Build[] = new  Array<Build>();
  complete_builds:Build[] = new  Array<Build>();

  setCurrentBuildObs(build:Build){
    this.currentBuildSource.next(build);
  }

  setCurrentBuild(id: string, build_type: string) {

    var builds:Build[] = this.storage.get(build_type);
    for(var i=0;i<builds.length;i++){
      if(builds[i].id==id){
        this.setCurrentBuildObs(builds[i]);
      }
    }

  }

  getBuilds(builds_type:string): Build[] {
    return this.storage.get(builds_type);  
  }

  getBuild(buildID: string): Build {
    return this.storage.get(buildID);  
  }
  
  addBuild(b1: import("../Model/Build").Build) {
    this.storage.set(b1.id,b1);
  }

  constructor(@Inject(LOCAL_STORAGE) private storage:StorageService) { 

    
    var defaultBuild:Build =
    {
     "id": "",
     "customer": {
       "name":"",
       "id_letters":"",
       "id_numbers":"",
       "location":""
     },
     "datacenter": "",
     "platform_engineer": "",
     "size": "",
     "status": "",
     "completion": ""
    }

    this.setCurrentBuildObs(defaultBuild);

    
    var b1:Build =
    {
     "id": "customer1",
     "customer": {
       "name":"Customer1",
       "id_letters":"INT",
       "id_numbers":"1234",
       "location":"location"
     },
     "datacenter": "Denver",
     "platform_engineer": "James Bond",
     "size": "Medium",
     "status": "Pending",
     "completion": "100"
    }
    var b2:Build =
    {
     "id": "customer2",
     "customer": {
      "name":"Customer2",
      "id_letters":"INT",
      "id_numbers":"4321",
      "location":"location"
     },
     "datacenter": "Suwanee",
     "platform_engineer": "Patrick James",
     "size": "Medium",
     "status": "Pending (Failed Validation)",
     "completion": "100"
    }
    var b3:Build =
    {
     "id": "customer3",
     "customer": {
      "name":"Customer3",
      "id_letters":"ANNS",
      "id_numbers":"4321",
      "location":"location"
     },
     "datacenter": "Suwanee",
     "platform_engineer": "Steve Hallen",
     "size": "Small",
     "status": "Cancelled",
     "completion": "50"
    }
    var b4:Build =
    {
     "id": "customer4",
     "customer": {
      "name":"Customer4",
      "id_letters":"ANNS",
      "id_numbers":"1234",
      "location":"location"
     },
     "datacenter": "Denver",
     "platform_engineer": "Steve Brock",
     "size": "Medium",
     "status": "Running",
     "completion": "27"
    }
    var b5:Build =
    {
     "id": "customer5",
     "customer": {
      "name":"Customer5",
      "id_letters":"ANNAS",
      "id_numbers":"43221",
      "location":"location"
     },
     "datacenter": "Denver",
     "platform_engineer": "John Deere",
     "size": "Large",
     "status": "Failed",
     "completion": "83"
    }

    this.incomplete_builds.push(b1);
    this.incomplete_builds.push(b2);
    this.incomplete_builds.push(b3);
    this.incomplete_builds.push(b4);
    this.incomplete_builds.push(b5);
    this.incomplete_builds.push(b1);
    this.incomplete_builds.push(b2);
    this.incomplete_builds.push(b3);
    this.incomplete_builds.push(b4);
    this.incomplete_builds.push(b5);
    this.incomplete_builds.push(b1);
    this.incomplete_builds.push(b2);
    this.incomplete_builds.push(b3);
    this.incomplete_builds.push(b4);
    this.incomplete_builds.push(b5);

    this.storage.set("incomplete_builds",this.incomplete_builds);

    var bc12:Build =
    {
     "id": "customer12c",      
     "customer": {
      "name":"Customer1",
      "id_letters":"INT",
      "id_numbers":"1234",
      "location":"location"
    },
     "datacenter": "Denver",
     "platform_engineer": "James Bond",
     "size": "Medium",
     "status": "Completed",
     "completion": "100"
    }
    var bc22:Build =
    {      
     "id": "customer22c",
     "customer": {
      "name":"Customer2",
      "id_letters":"INT",
      "id_numbers":"4321",
      "location":"location"
     },
     "datacenter": "Suwanee",
     "platform_engineer": "Patrick James",
     "size": "Medium",
     "status": "Completed",
     "completion": "100"
    }
    var bc32:Build =
    {
     "id": "customer32c",      
     "customer": {
      "name":"Customer3",
      "id_letters":"ANNS",
      "id_numbers":"4321",
      "location":"location"
     },
     "datacenter": "Suwanee",
     "platform_engineer": "Steve Hallen",
     "size": "Small",
     "status": "Completed",
     "completion": "100"
    }
    var bc42:Build =
    {
     "id": "customer42c",      
     "customer": {
      "name":"Customer4",
      "id_letters":"ANNS",
      "id_numbers":"1234",
      "location":"location"
     },
     "datacenter": "Denver",
     "platform_engineer": "Steve Brock",
     "size": "Medium",
     "status": "Completed",
     "completion": "100"
    }
    var bc52:Build =
    {
     "id": "customer52c",      
     "customer": {
      "name":"Customer5",
      "id_letters":"ANNAS",
      "id_numbers":"43221",
      "location":"location"
     },
     "datacenter": "Denver",
     "platform_engineer": "John Deere",
     "size": "Large",
     "status": "Completed",
     "completion": "100"
    }

    this.complete_builds.push(bc12);
    this.complete_builds.push(bc22);
    this.complete_builds.push(bc32);
    this.complete_builds.push(bc42);
    this.complete_builds.push(bc52);
    this.complete_builds.push(bc12);
    this.complete_builds.push(bc22);
    this.complete_builds.push(bc32);
    this.complete_builds.push(bc42);
    this.complete_builds.push(bc52);
    this.complete_builds.push(bc12);
    this.complete_builds.push(bc22);
    this.complete_builds.push(bc32);
    this.complete_builds.push(bc42);
    this.complete_builds.push(bc52);

    this.storage.set("complete_builds",this.complete_builds);

  }
}
