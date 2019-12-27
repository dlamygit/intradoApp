import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Build } from 'src/app/Model/Build';
import Swal from 'sweetalert2';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

const size = ['Small','Medium','Large'];
const states = ['Denver','Suwanee'];

@Component({
  selector: 'app-build-config',
  templateUrl: './build-config.component.html',
  styleUrls: ['./build-config.component.css']
})

export class BuildConfigComponent implements OnInit {

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  @ViewChild('secondary_datacenter', {static: true}) secondary_datacenter_instance: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !!this.instance && !this.instance.isPopupOpen()));

      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? states
          : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
  } 

  
  size = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !!this.instance && !this.instance.isPopupOpen()));

    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? size
        : size.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

    
  } 
  secondary_datacenter = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !!this.secondary_datacenter_instance && !this.secondary_datacenter_instance.isPopupOpen()));

    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  } 


  currentBuild:Build;

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
  }

  back(){
    this.router.navigate(["builds"]);
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
