import { Component, OnInit } from '@angular/core';
import { TowerAPIService } from 'src/app/service/tower-api.service';
import Swal from 'sweetalert2';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { delay } from 'q';

@Component({
  selector: 'app-provision',
  templateUrl: './provision.component.html',
  styleUrls: ['./provision.component.css']
})
export class ProvisionComponent implements OnInit {

  constructor(private tower_api_service:TowerAPIService) { }

  ngOnInit() {
  }

  onSubmit(){
  
    this.tower_api_service.startJob(18)
    .subscribe((data) => {
      Swal.fire(
        'VM Provisioning process started successfully',
        '',
        'success'
      );
      
      console.log(data);
    }, err => {
      Swal.fire(
        'VM Provisioning process failed',
        err.error.detail,
        'error'
      );
      console.log(err);
    });
  
  }

}
