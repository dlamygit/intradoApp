import { Component, OnInit } from '@angular/core';
import { TowerAPIService } from 'src/app/service/tower-api.service';
import Swal from 'sweetalert2';
import { CloneParameter } from 'src/app/Model/CloneParameter';
import { FolderParameter } from 'src/app/Model/FolderParameter';

@Component({
  selector: 'app-provision',
  templateUrl: './provision.component.html',
  styleUrls: ['./provision.component.css']
})
export class ProvisionComponent implements OnInit {

  constructor(private tower_api_service:TowerAPIService) { }

  customerID:String = "1202INT";
  customerName:String = "INTRADO";

  ngOnInit() {
  }

  cloneParameters:CloneParameter[] = new Array<CloneParameter>();
  folderParameters:FolderParameter[] =  new Array<FolderParameter>();

  onSubmit(){

    var c1:CloneParameter =    
    {
        "datacenter_name": "Datacenters",
        "vm_state": "poweredoff",
        "vm_name": "qa_extra_INTCCM1P01SWN",
        "vm_template_name": "Linux-CentOS-Template-Demo",
        "full_folder_path": "/Atlanta & Suwanee - Customers/"+this.customerID+" - "+this.customerName,
        "datastore": "datastore3",
        "host": "172.10.3.29",
        "vm_final_state": "poweredoff",
        "answer_file_name": "c1-platformConfig.xml"
     };

     var c2:CloneParameter =    
     {
      "datacenter_name": "Datacenters",
      "vm_state": "poweredoff",
      "vm_name": "qa_extra_INTCCM1P01DEN",
      "vm_template_name": "Linux-CentOS-Template-Demo",
      "full_folder_path": "/Denver - Customers/"+this.customerID+" - "+this.customerName,
      "datastore": "datastore2",
      "host": "172.10.3.29",
      "vm_final_state": "poweredoff",
      "answer_file_name": "c1-platformConfig.xml"
     }

     var f1:FolderParameter =
     {
      "datacenter_name": "Datacenters",
      "sub_folder_name": this.customerID+" - "+this.customerName,
      "parent_folder_name": "Atlanta & Suwanee - Customers",
      "folder_state": "present"
     }
     var f2:FolderParameter =
     {
      "datacenter_name": "Datacenters",
      "sub_folder_name": this.customerID+" - "+this.customerName,
      "parent_folder_name": "Denver - Customers",
      "folder_state": "present"
     }

     this.cloneParameters.push(c1);
     this.cloneParameters.push(c2);

     this.folderParameters.push(f1);
     this.folderParameters.push(f2);
  
    this.tower_api_service.startJob(9,this.customerName)
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
