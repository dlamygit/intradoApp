import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class TowerAPIService {

  constructor(private http: HttpClient) { }

  url = "https://172.10.7.13/api/v2/job_templates/";

  startJob(job_id:number){  
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer LLsBa0a11n545hTcXarCxoNlONwxsF'
      }),
      data: {"limit" : "ansible"}
    };
    
    var body_post = {
      "extra_vars":{
         "call_from_tower": true,
         "clones_parameters": [
          {
           "datacenter_name": "Datacenters",
           "vm_state": "poweredoff",
           "vm_name": "qa_extra_INTCCM1P01SWN",
           "vm_template_name": "Linux-CentOS-Template-Demo",
           "full_folder_path": "/Atlanta & Suwanee - Customers/1202INT - INTRADO",
           "datastore": "datastore3",
           "host": "172.10.3.29",
           "vm_final_state": "poweredoff",
           "answer_file_name": "c1-platformConfig.xml"
          },
          {
           "datacenter_name": "Datacenters",
           "vm_state": "poweredoff",
           "vm_name": "qa_extra_INTCCM1P01DEN",
           "vm_template_name": "Linux-CentOS-Template-Demo",
           "full_folder_path": "/Denver - Customers/1202INT - INTRADO",
           "datastore": "datastore2",
           "host": "172.10.3.29",
           "vm_final_state": "poweredoff",
           "answer_file_name": "c1-platformConfig.xml"
          }
         ],
         "cucm_primary_node": {
          "answer_file_path": "temp/INTRADO/c1-platformConfig.xml",
          "app_user_username": "cucm_appuser",
          "auto_register_primary": "0",
          "call_home_disable": "Disabled",
          "ccm_first_node": "yes",
          "ccm_version": "",
          "certificate_country": "AR",
          "certificate_location": "Santa Fe",
          "certificate_organization": "Intrado-AR",
          "certificate_state": "Santa Fe",
          "certificate_unit": "UCBOP-AR",
          "domain_name": "local",
          "host_admin": "cucm_admin",
          "host_admin_password": "Pa$$word!",
          "host_app_user_password": "Pa$$word!",
          "host_city": "Argentina",
          "host_continent": "America",
          "host_gateway": "172.10.2.2",
          "host_ip": "172.10.3.35",
          "host_mask": "255.255.240.0",
          "host_name": "some-host-name",
          "host_security_password": "Pa$$word!",
          "host_timezone": "America/Argentina/Buenos_Aires",
          "ip_security_first_node": "yes",
          "locale_id": "",
          "ntp_server_1": "173.224.149.136",
          "ntp_server_2": "173.224.157.252",
          "ntp_server_3": "199.38.38.3",
          "primary_dns": "172.10.2.2",
          "secondary_dns": ""
         },
         "cucm_primary_node_common": {
          "answer_file_prefix": "c1"
         },
         "customer_id": "1202INT",
         "customer_name": "INTRADO",
         "datastore_device_name": "mpx.vmhba0:C0:T0:L0",
         "datastore_name": "datastore2",
         "datastore_type": "vmfs",
         "env_name": "qa_extra",
         "folders_parameters": [
          {
           "datacenter_name": "Datacenters",
           "sub_folder_name": "1202INT - INTRADO",
           "parent_folder_name": "Atlanta & Suwanee - Customers",
           "folder_state": "present"
          },
          {
           "datacenter_name": "Datacenters",
           "sub_folder_name": "1202INT - INTRADO",
           "parent_folder_name": "Denver - Customers",
           "folder_state": "present"
          }
         ],
         "host_name": "172.10.3.29",
         "vcenter_hostname": "photon-machine.localdomain",
         "vcenter_password": "Root718293?",
         "vcenter_username": "administrator@vsphere.local",
         "vmfs_version": 6
        }
    }


    return this.http.post(this.url+job_id+'/launch/',body_post,httpOptions);
    
  }

}

