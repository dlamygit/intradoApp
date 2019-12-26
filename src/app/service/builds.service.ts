import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Build } from '../Model/Build';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BuildsService {

  builds:Build[] = new  Array<Build>();
  STORAGE_BUILDS:string = "builds";

  private currentBuildSource = new BehaviorSubject<Build>(null);
  currentBuild = this.currentBuildSource.asObservable();

  updateCurrentBuild(id: string) {
    console.log(id);
    var build = this.getBuild(id);
    console.log(build);
    this.currentBuildSource.next(build);
    console.log(this.currentBuild);

  }

  getBuilds(): Build[] {
    return this.storage.get(this.STORAGE_BUILDS);  
  }

  getBuild(id: string): Build {
    var builds:Build[] = this.getBuilds();

    return builds.find(build => build.id = id);
  }
  
  addBuild(build: Build):Build {    
    var builds:Build[] = this.getBuilds();
    builds.push(build);
    this.storage.set(this.STORAGE_BUILDS,builds);
    return this.getBuild(build.id); //Just for checking that was added
  }

  deleteBuild(build: Build){
    var builds:Build[] = this.getBuilds();
    var index = builds.indexOf(build);
    builds.splice(index,1);
    this.storage.set(this.STORAGE_BUILDS,builds);    
  }

  runBuild(id:string) {
    console.log("Runnning build: "+id);
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

    this.currentBuildSource.next(defaultBuild);
    
    //Incomplete Builds
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

    this.builds.push(b1);
    this.builds.push(b2);
    this.builds.push(b3);
    this.builds.push(b4);
    this.builds.push(b5);
    this.builds.push(b1);
    this.builds.push(b2);
    this.builds.push(b3);
    this.builds.push(b4);
    this.builds.push(b5);
    this.builds.push(b1);
    this.builds.push(b2);
    this.builds.push(b3);
    this.builds.push(b4);
    this.builds.push(b5);

    //Complete Builds
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

    this.builds.push(bc12);
    this.builds.push(bc22);
    this.builds.push(bc32);
    this.builds.push(bc42);
    this.builds.push(bc52);
    this.builds.push(bc12);
    this.builds.push(bc22);
    this.builds.push(bc32);
    this.builds.push(bc42);
    this.builds.push(bc52);
    this.builds.push(bc12);
    this.builds.push(bc22);
    this.builds.push(bc32);
    this.builds.push(bc42);
    this.builds.push(bc52);

    this.storage.set(this.STORAGE_BUILDS,this.builds);

  }
}
