import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Build } from '../Model/Build';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logs } from '../Model/Logs';

@Injectable({
  providedIn: 'root'
})
export class BuildsService {

  STORAGE_BUILDS:string = "builds";
  STORAGE_LOGS:string = "logs";
  builds:Build[] = new  Array<Build>();
  logs:Logs[] = new  Array<Logs>();

  private buildsSource = new BehaviorSubject<Build[]>(null);
  buildsN = this.buildsSource.asObservable();

  private currentBuildSource = new BehaviorSubject<Build>(null);
  currentBuild = this.currentBuildSource.asObservable();

  getBuildStatus(id:string):String{
    return this.getBuild(id).status;
  }
   //GET builds
  getBuilds(): Build[] {
    return this.storage.get(this.STORAGE_BUILDS);  
  }

  //GET individual Build
  getBuild(id: string): Build {
    return this.getBuilds().find(build => build.id === id);
  }
  
  getID(size:Number): string{
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var _id:string ="";
    for (let i = 0; i < 8; i++) {
      _id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    _id+="-";
    for (let i = 0; i < 4; i++) {
      _id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    _id+="-";
    for (let i = 0; i < 4; i++) {
      _id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    _id+="-";
    for (let i = 0; i < 4; i++) {
      _id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    _id+="-";
    for (let i = 0; i < 12; i++) {
      _id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return _id;
  }
  

  createEmptyBuild():Build{

    var emptyBuild:Build =
    {
    "id": "0",
    "customer": {
      "name":"",
      "id_letters":"",
      "id_numbers":"",
      "ITC_location":"",
      "address_1":"",
      "address_2":"",
      "city":"",
      "state":"",
      "zip_code":"",
      "timezone":"",
      "default_code_area":"",
      "local_dial":"",
      "extension_length":"",
      "breakout_code":"",
      "voice_mail_pilot":""
    },
    "domain":{
      "server_domain":"",
      "presence_domain":""
    },
    "active_directory":{
      "timezone":"",
      "default_code_area":"",
      "local_dial":"",
      "extension_length":"",
      "breakout_code":"",
      "voice_mail_pilot":""
    },
    "size":"",
    "unified_messaging":{
      "username":"",
      "password":"",
      "version":"",
      "ip_address":""
    },
    "platform_test_account":{
      "username":"",
      "password":""
    },
    "customer_notes":"",
    "primary_datacenter":{
      "name":"",
      "host_ip":"",
      "v_lan":"",
      "host_gateway":"",
      "asr_address":""
    },
    "secondary_datacenter":{
      "name":"",
      "host_ip":"",
      "v_lan":"",
      "host_gateway":"",
      "asr_address":""
    },
    "infrastructure":{
      "datacenter":"",
      "cluster":"",
      "datastore":""
    },
    "additional_network_data":{
      "vrf":"",
      "nat_box_ip":""
    },
    "mra_expressway":{
      "primary_dc_external_ip":"",
      "primary_dc_internal_ip":"",
      "secondary_dc_external_ip":"",
      "secondary_dc_internal_ip":""
    },
    "additional_services":{
      "expressway":true,
      "singlewire":false,
      "cuaca":false,
      "egw":false,
      "hybrid_services":false
    },
    "infrastructure_notes":"",
    "dns_ntp":{
      "primary_dns":"",
      "secondary_dns":"",
      "ntp_server_1":"",
      "ntp_server_2":"",
      "ntp_server_3":"",
      "ntp_server_4":"",
      "ntp_server_5":"",
    },
    "host_data":{
      "timezone":"",
      "continent":"",
      "city":"",
      "admin":"",
      "password":"",
      "security_password":"",
      "app_user_password":""
    },
    "certificates":{
      "organization":"",
      "unit":"",
      "location":"",
      "state":"",
      "country":"",
      "auto_register_primary":"",
      "app_user_username":""
    },
    "host_data_notes":"",
    "vms":[],
    "dns_records":{
      "dns_to_ip":[],
      "ip_to_dsn":[]
    },
    "platform_engineer": "",
    "status": "",
    "completion": ""
    }

    return emptyBuild;

  }

  createEmptyLog(build_id:string):Logs{

    var emptyLog:Logs={
      "build_id":build_id,
      "validationLogs":[],
      "executionLogs":[]
    }

    return emptyLog;
  }

  getAllLogs():Logs[]{
    return this.storage.get(this.STORAGE_LOGS);
  }
  //POST Build
  addBuild(build: Build):Build {    
      
    var _id:string = this.getID(64);
    build.id = _id;

    //Agregar build
    this.builds = this.getBuilds().concat(build);

    //Almacenar en localstorage
    this.storage.set(this.STORAGE_BUILDS,this.builds);
    //Actualizar el observable
    this.buildsSource.next(this.builds);

    //Create logs for the build created
    this.logs = this.getAllLogs().concat(this.createEmptyLog(build.id));
    this.storage.set(this.STORAGE_LOGS,this.logs);

    //Just for checking that was added
    return this.getBuild(build.id); 
  }

  //PUT Build
  updateBuild(id: string,build:Build):Build{
    
    if(id=="0"){
      return this.addBuild(build);
    }
    else{

      for(var i=0;i<this.builds.length;i++){
        if(this.builds[i].id==id){
          this.builds[i] = build;
        }
      }
        
      this.storage.set(this.STORAGE_BUILDS,this.builds);
      //Actualizar el observable
      this.buildsSource.next(this.builds);
      
      return this.getBuild(id);
    }
    
  }

  //DELETE Build
  deleteBuild(id: string){
    this.builds = this.getBuilds();

    for( var i = 0; i < this.builds.length; i++){ 
      if ( this.builds[i].id == id) {
        this.builds.splice(i, 1);         
      }
    }

    this.storage.set(this.STORAGE_BUILDS,this.builds);   
    this.buildsSource.next(this.builds); 
  }

  runBuild(id:string) {
    console.log("Runnning build: "+id);
  }

  getLogs(build_id:string):Logs{
    return this.storage.get(this.STORAGE_LOGS).find(logs => logs.build_id === build_id);  
  }

  constructor(@Inject(LOCAL_STORAGE) private storage:StorageService) { 
 
    //Incomplete Builds
    var b1:Build =
    {
      "id": "CYB7PSOC-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
      "customer": {
        "name":"Test Customer Name",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"Old Lake 252",
        "address_2":"New Lake 525",
        "city":"Huston",
        "state":"California",
        "zip_code":"526182",
        "timezone":"GTM-5",
        "default_code_area":"+1",
        "local_dial":"5251",
        "extension_length":"51248",
        "breakout_code":"51324",
        "voice_mail_pilot":"521651"
      },
      "domain":{
        "server_domain":"denver",
        "presence_domain":"suwanee"
      },
      "active_directory":{
        "timezone":"GTM-6",
        "default_code_area":"+2",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Medium",
      "unified_messaging":{
        "username":"tes_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"168.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Denver",
        "host_ip":"173.10.51.2",
        "v_lan":"32",
        "host_gateway":"173.10.51.1",
        "asr_address":"173.10.54.2"
      },
      "secondary_datacenter":{
        "name":"Suwanee",
        "host_ip":"173.10.52.2",
        "v_lan":"32",
        "host_gateway":"173.10.52.1",
        "asr_address":"173.10.53.2"
      },
      "infrastructure":{
        "datacenter":"Denver",
        "cluster":"cluster_1",
        "datastore":"datastore_1"
      },
      "additional_network_data":{
        "vrf":"173.51.23.21",
        "nat_box_ip":"173.51.23.21"
      },
      "mra_expressway":{
        "primary_dc_external_ip":"173.51.23.21",
        "primary_dc_internal_ip":"173.51.23.22",
        "secondary_dc_external_ip":"173.51.23.213",
        "secondary_dc_internal_ip":"173.51.23.212"
      },
      "additional_services":{
        "expressway":true,
        "singlewire":false,
        "cuaca":false,
        "egw":false,
        "hybrid_services":false
      },
      "infrastructure_notes":"This is a text area to store notes when the build is being created",
      "dns_ntp":{
        "primary_dns":"173.51.23.1",
        "secondary_dns":"173.51.23.2",
        "ntp_server_1":"173.51.23.3",
        "ntp_server_2":"173.51.23.4",
        "ntp_server_3":"173.51.23.5",
        "ntp_server_4":"173.51.23.6",
        "ntp_server_5":"173.51.23.7",
      },
      "host_data":{
        "timezone":"GTM-4",
        "continent":"America",
        "city":"San Francisco",
        "admin":"admin_user",
        "password":"password_test_host",
        "security_password":"password_test_host",
        "app_user_password":"password_test_host"
      },
      "certificates":{
        "organization":"org_certificate",
        "unit":"unit_cert",
        "location":"loc_certificate",
        "state":"Lousiana",
        "country":"EEUU",
        "auto_register_primary":"test_auto",
        "app_user_username":"username_auto"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"vm_name":"",
         "host_name":"",
         "host_ip":"",
         "v_lan":"",
         "host_gateway":"",
         "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
         },
         "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"org_certificate",
          "unit":"unit_cert",
          "location":"loc_certificate",
          "state":"Lousiana",
          "country":"EEUU",
          "auto_register_primary":"test_auto",
          "app_user_username":"username_auto"
        }  
      },
      {"vm_name":"",
         "host_name":"",
         "host_ip":"",
         "v_lan":"",
         "host_gateway":"",
         "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
         },
         "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"",
          "unit":"",
          "location":"",
          "state":"",
          "country":"",
          "auto_register_primary":"",
          "app_user_username":""
        }  
      },
      {"vm_name":"",
         "host_name":"",
         "host_ip":"",
         "v_lan":"",
         "host_gateway":"",
         "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
         },
         "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"",
          "unit":"",
          "location":"",
          "state":"",
          "country":"",
          "auto_register_primary":"",
          "app_user_username":""
        }  
      },
      {"vm_name":"",
         "host_name":"",
         "host_ip":"",
         "v_lan":"",
         "host_gateway":"",
         "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
         },
         "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"",
          "unit":"",
          "location":"",
          "state":"",
          "country":"",
          "auto_register_primary":"",
          "app_user_username":""
        }  
      },
      {"vm_name":"",
        "host_name":"",
        "host_ip":"",
        "v_lan":"",
        "host_gateway":"",
        "dns_ntp":{
          "primary_dns":"",
          "secondary_dns":"",
          "ntp_server_1":"",
          "ntp_server_2":"",
          "ntp_server_3":"",
          "ntp_server_4":"",
          "ntp_server_5":"",
        },
        "host_data":{
        "timezone":"",
        "continent":"",
        "city":"",
        "admin":"",
        "password":"",
        "security_password":"",
        "app_user_password":""
      },
      "certificates":{
        "organization":"",
        "unit":"",
        "location":"",
        "state":"",
        "country":"",
        "auto_register_primary":"",
        "app_user_username":""
      }  
      },
      {"vm_name":"",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
          },
          "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"",
          "unit":"",
          "location":"",
          "state":"",
          "country":"",
          "auto_register_primary":"",
          "app_user_username":""
        }  
      },
      {"vm_name":"",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
          },
          "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"",
          "unit":"",
          "location":"",
          "state":"",
          "country":"",
          "auto_register_primary":"",
          "app_user_username":""
        }  
      },
      {"vm_name":"",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
          },
          "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"",
          "unit":"",
          "location":"",
          "state":"",
          "country":"",
          "auto_register_primary":"",
          "app_user_username":""
        }  
      },
      {"vm_name":"",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"",
            "secondary_dns":"",
            "ntp_server_1":"",
            "ntp_server_2":"",
            "ntp_server_3":"",
            "ntp_server_4":"",
            "ntp_server_5":"",
          },
          "host_data":{
          "timezone":"",
          "continent":"",
          "city":"",
          "admin":"",
          "password":"",
          "security_password":"",
          "app_user_password":""
        },
        "certificates":{
          "organization":"",
          "unit":"",
          "location":"",
          "state":"",
          "country":"",
          "auto_register_primary":"",
          "app_user_username":""
        }  
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"",
           "ip":""
          },
          {"dns":"",
           "ip":""
          },
          {"dns":"",
           "ip":""
          },
          {"dns":"",
          "ip":""
          },
          {"dns":"",
          "ip":""
          },
          {"dns":"",
          "ip":""
          },          
          {"dns":"",
          "ip":""
          },
          {"dns":"",
          "ip":""
          },
          {"dns":"",
          "ip":""
          }          
        ],
        "ip_to_dsn":[
          {"dns":"",
          "ip":""
         },
         {"dns":"",
          "ip":""
         },
         {"dns":"",
          "ip":""
         },
         {"dns":"",
         "ip":""
         },
         {"dns":"",
         "ip":""
         },
         {"dns":"",
         "ip":""
         },          
         {"dns":"",
         "ip":""
         },
         {"dns":"",
         "ip":""
         },
         {"dns":"",
         "ip":""
         }
        ]
      },
      "platform_engineer": "Test Engineer",
      "status": "Completed",
      "completion": "57"
    }
        
    this.builds.push(b1);

    this.storage.set(this.STORAGE_BUILDS,this.builds);
    this.buildsSource.next(this.builds);

    var logs:Logs ={
      "build_id":"CYB7PSOC-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
      "validationLogs":[
        {"id":"1",
         "date":new Date(),
         "title":"Log titile",
         "type":"Validation Log",
         "details":"Log details",
         "module":"Log module",
         "status":"Success"
        },
        {"id":"2",
         "date":new Date(),
         "title":"Log titile",
         "type":"Validation Log",
         "details":"Log details",
         "module":"Log module",
         "status":"Running"
        },
        {"id":"3",
         "date":new Date(),
         "title":"Log titile",
         "type":"Validation Log",
         "details":"Log details",
         "module":"Log module",
         "status":"Failed"
        }],
      "executionLogs":[
        {"id":"1",
         "date":new Date(),
         "title":"Log titile",
         "type":"Execution Log",
         "details":"Log details",
         "module":"Log module",
         "status":"Success"
        },
        {"id":"2",
         "date":new Date(),
         "title":"Log titile",
         "type":"Execution Log",
         "details":"Log details",
         "module":"Log module",
         "status":"Success"
        },
        {"id":"3",
         "date":new Date(),
         "title":"Log titile",
         "type":"Execution Log",
         "details":"Log details",
         "module":"Log module",
         "status":"Running"
        }]
    }

    this.logs.push(logs);
    this.storage.set(this.STORAGE_LOGS,this.logs);
  }
}

