import { Component, OnInit } from '@angular/core';
import { TowerAPIService } from 'src/app/service/tower-api.service';

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
    this.tower_api_service.startJob()
    .subscribe((data) => {
      alert("VM Provisioning started");
      console.log(data);
    });
  
  }

}
