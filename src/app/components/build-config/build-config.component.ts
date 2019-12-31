import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Build } from 'src/app/Model/Build';
import Swal from 'sweetalert2';
import { NgbTypeahead, NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { VirtualMachine } from 'src/app/Model/VirtualMachine';

const size = ['Small','Medium','Large'];
const states = ['Denver','Suwanee'];

@Component({
  selector: 'app-build-config',
  templateUrl: './build-config.component.html',
  styleUrls: ['./build-config.component.css']
})


export class BuildConfigComponent implements OnInit {

  currentBuild:Build;
  currentVM: VirtualMachine;
  
   //Review how this work
   @ViewChild("vmTabs", { static: true, read: NgbTabset }) 
   vmTabs: NgbTabset;


  constructor(private router:Router,private route: ActivatedRoute,private buildsService:BuildsService) { 
    this.route.params.subscribe((params) => {
      const build_id = params['id'] as string;
      if(build_id=="0"){
        this.currentBuild = this.buildsService.createEmptyBuild();
      }
      else{
        this.currentBuild = this.buildsService.getBuild(build_id);
      }
    })
  }

  ngOnInit() {
    this.currentVM=this.currentBuild.vms[0];
  }

  onTabChange($event: NgbTabChangeEvent) {
    this.setVMValues($event.nextId);
  }

  setVMValues(vm_id:string){
    for(var i=0;i<this.currentBuild.vms.length;i++){
      if(this.currentBuild.vms[i].id===vm_id){
        this.currentVM=this.currentBuild.vms[i];      
      }
    }
  }

  back(){
    window.history.back();
  }

  validationLogs(build_id:string){
    this.router.navigate(["logs",build_id,"validation"]);

  }
  
  validateProvision(build_id:string){
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
        this.router.navigate(["build_config", this.buildsService.updateBuild(id,this.currentBuild).id]);    
        Swal.fire(
          'Saved!',
          'Changes applied',
          'success'
        )
      }
    })
  }  

}
