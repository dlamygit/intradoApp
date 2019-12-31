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
    "completion": "",
    "elapsed_time": "",
    "parameters_required":"",
    "parameters_completed":""
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
        "name":"Umbrella Corp",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"9601 Gran St",
        "address_2":"9106 Gran St",
        "city":"Denver",
        "state":"Colorado (CO)",
        "zip_code":"80201",
        "timezone":"GTM-7",
        "default_code_area":"+1",
        "local_dial":"720",
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
        "default_code_area":"+1",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Medium",
      "unified_messaging":{
        "username":"test_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"192.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Denver",
        "host_ip":"192.168.10.2",
        "v_lan":"32",
        "host_gateway":"192.168.10.1",
        "asr_address":"193.168.2.3"
      },
      "secondary_datacenter":{
        "name":"Suwanee",
        "host_ip":"192.168.20.2",
        "v_lan":"32",
        "host_gateway":"192.168.20.1",
        "asr_address":"192.168.20.1"
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
        "ntp_server_1":"ntp01-lou.vmce.westipc.com",
        "ntp_server_2":"ntp02-lou.vmce.westipc.com",
        "ntp_server_3":"ntp03-lou.vmce.westipc.com",
        "ntp_server_4":"ntp04-lou.vmce.westipc.com",
        "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
        "country":"EE.UU.",
        "auto_register_primary":"test_primary",
        "app_user_username":"username_auto_prim"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"id":"cm_publisher",
        "vm_name":"CCM1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.6",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_1",
      "vm_name":"CCM1S01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.7",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_2",
      "vm_name":"CCCM1P01SWN",
         "host_name":"host_name_suwanee",
         "host_ip":"192.168.20.7",
         "v_lan":"32",
         "host_gateway":"192.168.20.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_1",
      "vm_name":"IMP1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.8",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_2",
      "vm_name":"IMP1S01SWN",
        "host_name":"host_name_suwanee",
        "host_ip":"192.168.10.9",
        "v_lan":"32",
        "host_gateway":"192.168.20.2",
        "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cucx_publisher",
      "vm_name":"CUC1S01DEN",
          "host_name":"host_name_denver",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"cucx_subscriber",
      "vm_name":"CUC1P01SWN",
          "host_name":"host_name_suwanee",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"expressway_1",
      "vm_name":"expressway_1_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }  
      },
      {"id":"expressway_2",
        "vm_name":"expressway_2_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }          
        ],
        "ip_to_dsn":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }         
        ]
      },
      "platform_engineer": "Bruce Wayne",
      "status": "Ready",
      "completion": "0",
      "elapsed_time":"-:-",
      "parameters_required":"79",
      "parameters_completed":"79"
    }
	
 var b2:Build =
    {
      "id": "CYB7PSOC-0KAC-8Q56-JT3E-V63Y8CAKYK7B",
      "customer": {
        "name":"Fedex",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"9601 Gran St",
        "address_2":"9106 Gran St",
        "city":"Denver",
        "state":"Colorado (CO)",
        "zip_code":"80201",
        "timezone":"GTM-7",
        "default_code_area":"+1",
        "local_dial":"720",
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
        "default_code_area":"+1",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Medium",
      "unified_messaging":{
        "username":"test_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"192.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Denver",
        "host_ip":"192.168.10.2",
        "v_lan":"32",
        "host_gateway":"192.168.10.1",
        "asr_address":"193.168.2.3"
      },
      "secondary_datacenter":{
        "name":"Suwanee",
        "host_ip":"192.168.20.2",
        "v_lan":"32",
        "host_gateway":"192.168.20.1",
        "asr_address":"192.168.20.1"
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
        "ntp_server_1":"ntp01-lou.vmce.westipc.com",
        "ntp_server_2":"ntp02-lou.vmce.westipc.com",
        "ntp_server_3":"ntp03-lou.vmce.westipc.com",
        "ntp_server_4":"ntp04-lou.vmce.westipc.com",
        "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
        "country":"EE.UU.",
        "auto_register_primary":"test_primary",
        "app_user_username":"username_auto_prim"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"id":"cm_publisher",
        "vm_name":"CCM1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.6",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_1",
      "vm_name":"CCM1S01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.7",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_2",
      "vm_name":"CCCM1P01SWN",
         "host_name":"host_name_suwanee",
         "host_ip":"192.168.20.7",
         "v_lan":"32",
         "host_gateway":"192.168.20.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_1",
      "vm_name":"IMP1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.8",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_2",
      "vm_name":"IMP1S01SWN",
        "host_name":"host_name_suwanee",
        "host_ip":"192.168.10.9",
        "v_lan":"32",
        "host_gateway":"192.168.20.2",
        "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cucx_publisher",
      "vm_name":"CUC1S01DEN",
          "host_name":"host_name_denver",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"cucx_subscriber",
      "vm_name":"CUC1P01SWN",
          "host_name":"host_name_suwanee",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"expressway_1",
      "vm_name":"expressway_1_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }  
      },
      {"id":"expressway_2",
        "vm_name":"expressway_2_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }          
        ],
        "ip_to_dsn":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }         
        ]
      },
      "platform_engineer": "Frank Castle",
      "status": "Pending",
      "completion": "0",
      "elapsed_time":"-:-",
      "parameters_required":"79",
      "parameters_completed":"65"
    }	
	
 var b3:Build =
    {
      "id": "CYB7PSOC-0KAC-8Q56-JT3E-K7BV63Y8CAKY",
      "customer": {
        "name":"Sporks Company",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"9601 Gran St",
        "address_2":"9106 Gran St",
        "city":"Denver",
        "state":"Colorado (CO)",
        "zip_code":"80201",
        "timezone":"GTM-7",
        "default_code_area":"+1",
        "local_dial":"720",
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
        "default_code_area":"+1",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Small",
      "unified_messaging":{
        "username":"test_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"192.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Suwanee",
        "host_ip":"192.168.10.2",
        "v_lan":"32",
        "host_gateway":"192.168.10.1",
        "asr_address":"193.168.2.3"
      },
      "secondary_datacenter":{
        "name":"Denver",
        "host_ip":"192.168.20.2",
        "v_lan":"32",
        "host_gateway":"192.168.20.1",
        "asr_address":"192.168.20.1"
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
        "ntp_server_1":"ntp01-lou.vmce.westipc.com",
        "ntp_server_2":"ntp02-lou.vmce.westipc.com",
        "ntp_server_3":"ntp03-lou.vmce.westipc.com",
        "ntp_server_4":"ntp04-lou.vmce.westipc.com",
        "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
        "country":"EE.UU.",
        "auto_register_primary":"test_primary",
        "app_user_username":"username_auto_prim"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"id":"cm_publisher",
        "vm_name":"CCM1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.6",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_1",
      "vm_name":"CCM1S01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.7",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_2",
      "vm_name":"CCCM1P01SWN",
         "host_name":"host_name_suwanee",
         "host_ip":"192.168.20.7",
         "v_lan":"32",
         "host_gateway":"192.168.20.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_1",
      "vm_name":"IMP1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.8",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_2",
      "vm_name":"IMP1S01SWN",
        "host_name":"host_name_suwanee",
        "host_ip":"192.168.10.9",
        "v_lan":"32",
        "host_gateway":"192.168.20.2",
        "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cucx_publisher",
      "vm_name":"CUC1S01DEN",
          "host_name":"host_name_denver",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"cucx_subscriber",
      "vm_name":"CUC1P01SWN",
          "host_name":"host_name_suwanee",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"expressway_1",
      "vm_name":"expressway_1_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }  
      },
      {"id":"expressway_2",
        "vm_name":"expressway_2_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }          
        ],
        "ip_to_dsn":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }         
        ]
      },
      "platform_engineer": "Jhon Deere",
      "status": "Pending (FV)",
      "completion": "0",
      "elapsed_time":"-:-",
      "parameters_required":"50",
      "parameters_completed":"50"
    }	
	
 var b4:Build =
    {
      "id": "PSOCCYB7-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
      "customer": {
        "name":"Int CIA Morks",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"9601 Gran St",
        "address_2":"9106 Gran St",
        "city":"Denver",
        "state":"Colorado (CO)",
        "zip_code":"80201",
        "timezone":"GTM-7",
        "default_code_area":"+1",
        "local_dial":"720",
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
        "default_code_area":"+1",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Medium",
      "unified_messaging":{
        "username":"test_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"192.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Denver",
        "host_ip":"192.168.10.2",
        "v_lan":"32",
        "host_gateway":"192.168.10.1",
        "asr_address":"193.168.2.3"
      },
      "secondary_datacenter":{
        "name":"Suwanee",
        "host_ip":"192.168.20.2",
        "v_lan":"32",
        "host_gateway":"192.168.20.1",
        "asr_address":"192.168.20.1"
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
        "ntp_server_1":"ntp01-lou.vmce.westipc.com",
        "ntp_server_2":"ntp02-lou.vmce.westipc.com",
        "ntp_server_3":"ntp03-lou.vmce.westipc.com",
        "ntp_server_4":"ntp04-lou.vmce.westipc.com",
        "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
        "country":"EE.UU.",
        "auto_register_primary":"test_primary",
        "app_user_username":"username_auto_prim"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"id":"cm_publisher",
        "vm_name":"CCM1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.6",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_1",
      "vm_name":"CCM1S01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.7",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_2",
      "vm_name":"CCCM1P01SWN",
         "host_name":"host_name_suwanee",
         "host_ip":"192.168.20.7",
         "v_lan":"32",
         "host_gateway":"192.168.20.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_1",
      "vm_name":"IMP1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.8",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_2",
      "vm_name":"IMP1S01SWN",
        "host_name":"host_name_suwanee",
        "host_ip":"192.168.10.9",
        "v_lan":"32",
        "host_gateway":"192.168.20.2",
        "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cucx_publisher",
      "vm_name":"CUC1S01DEN",
          "host_name":"host_name_denver",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"cucx_subscriber",
      "vm_name":"CUC1P01SWN",
          "host_name":"host_name_suwanee",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"expressway_1",
      "vm_name":"expressway_1_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }  
      },
      {"id":"expressway_2",
        "vm_name":"expressway_2_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }          
        ],
        "ip_to_dsn":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }         
        ]
      },
      "platform_engineer": "John Wick",
      "status": "Canceled",
      "completion": "17",
      "elapsed_time":"05:15:23",
      "parameters_required":"79",
      "parameters_completed":"79"
    }	

 var b5:Build =
    {
      "id": "CYB7PSOC-JT3E-8Q56-JT3E-3Y8CAKYK7BV6",
      "customer": {
        "name":"Alchemy bars",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"9601 Gran St",
        "address_2":"9106 Gran St",
        "city":"Denver",
        "state":"Colorado (CO)",
        "zip_code":"80201",
        "timezone":"GTM-7",
        "default_code_area":"+1",
        "local_dial":"720",
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
        "default_code_area":"+1",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Large",
      "unified_messaging":{
        "username":"test_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"192.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Suwanee",
        "host_ip":"192.168.10.2",
        "v_lan":"32",
        "host_gateway":"192.168.10.1",
        "asr_address":"193.168.2.3"
      },
      "secondary_datacenter":{
        "name":"Denver",
        "host_ip":"192.168.20.2",
        "v_lan":"32",
        "host_gateway":"192.168.20.1",
        "asr_address":"192.168.20.1"
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
        "ntp_server_1":"ntp01-lou.vmce.westipc.com",
        "ntp_server_2":"ntp02-lou.vmce.westipc.com",
        "ntp_server_3":"ntp03-lou.vmce.westipc.com",
        "ntp_server_4":"ntp04-lou.vmce.westipc.com",
        "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
        "country":"EE.UU.",
        "auto_register_primary":"test_primary",
        "app_user_username":"username_auto_prim"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"id":"cm_publisher",
        "vm_name":"CCM1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.6",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_1",
      "vm_name":"CCM1S01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.7",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_2",
      "vm_name":"CCCM1P01SWN",
         "host_name":"host_name_suwanee",
         "host_ip":"192.168.20.7",
         "v_lan":"32",
         "host_gateway":"192.168.20.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_1",
      "vm_name":"IMP1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.8",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_2",
      "vm_name":"IMP1S01SWN",
        "host_name":"host_name_suwanee",
        "host_ip":"192.168.10.9",
        "v_lan":"32",
        "host_gateway":"192.168.20.2",
        "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cucx_publisher",
      "vm_name":"CUC1S01DEN",
          "host_name":"host_name_denver",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"cucx_subscriber",
      "vm_name":"CUC1P01SWN",
          "host_name":"host_name_suwanee",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"expressway_1",
      "vm_name":"expressway_1_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }  
      },
      {"id":"expressway_2",
        "vm_name":"expressway_2_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }          
        ],
        "ip_to_dsn":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }         
        ]
      },
      "platform_engineer": "Scott Jhonson",
      "status": "Failed",
      "completion": "83",
      "elapsed_time":"10:13:55",
      "parameters_required":"100",
      "parameters_completed":"100"
    }	
	
 var b6:Build =
    {
      "id": "CYB7PSOC-0KAC-8Q56-8Q56-3Y8CAKYK7BV6",
      "customer": {
        "name":"Cust Mors Treps",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"9601 Gran St",
        "address_2":"9106 Gran St",
        "city":"Denver",
        "state":"Colorado (CO)",
        "zip_code":"80201",
        "timezone":"GTM-7",
        "default_code_area":"+1",
        "local_dial":"720",
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
        "default_code_area":"+1",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Medium",
      "unified_messaging":{
        "username":"test_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"192.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Denver",
        "host_ip":"192.168.10.2",
        "v_lan":"32",
        "host_gateway":"192.168.10.1",
        "asr_address":"193.168.2.3"
      },
      "secondary_datacenter":{
        "name":"Suwanee",
        "host_ip":"192.168.20.2",
        "v_lan":"32",
        "host_gateway":"192.168.20.1",
        "asr_address":"192.168.20.1"
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
        "ntp_server_1":"ntp01-lou.vmce.westipc.com",
        "ntp_server_2":"ntp02-lou.vmce.westipc.com",
        "ntp_server_3":"ntp03-lou.vmce.westipc.com",
        "ntp_server_4":"ntp04-lou.vmce.westipc.com",
        "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
        "country":"EE.UU.",
        "auto_register_primary":"test_primary",
        "app_user_username":"username_auto_prim"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"id":"cm_publisher",
        "vm_name":"CCM1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.6",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_1",
      "vm_name":"CCM1S01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.7",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_2",
      "vm_name":"CCCM1P01SWN",
         "host_name":"host_name_suwanee",
         "host_ip":"192.168.20.7",
         "v_lan":"32",
         "host_gateway":"192.168.20.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_1",
      "vm_name":"IMP1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.8",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_2",
      "vm_name":"IMP1S01SWN",
        "host_name":"host_name_suwanee",
        "host_ip":"192.168.10.9",
        "v_lan":"32",
        "host_gateway":"192.168.20.2",
        "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cucx_publisher",
      "vm_name":"CUC1S01DEN",
          "host_name":"host_name_denver",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"cucx_subscriber",
      "vm_name":"CUC1P01SWN",
          "host_name":"host_name_suwanee",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"expressway_1",
      "vm_name":"expressway_1_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }  
      },
      {"id":"expressway_2",
        "vm_name":"expressway_2_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }          
        ],
        "ip_to_dsn":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }         
        ]
      },
      "platform_engineer": "Steve Hallen",
      "status": "Running",
      "completion": "23",
      "elapsed_time":"02:15:37",
      "parameters_required":"79",
      "parameters_completed":"79"
    }	
	
 var b7:Build =
    {
      "id": "CYB7PSOC-8Q56-8Q56-JT3E-3Y8CAKYK7BV6",
      "customer": {
        "name":"Customer Customs",
        "id_letters":"INT",
        "id_numbers":"1234",
        "ITC_location":"Denver",
        "address_1":"9601 Gran St",
        "address_2":"9106 Gran St",
        "city":"Denver",
        "state":"Colorado (CO)",
        "zip_code":"80201",
        "timezone":"GTM-7",
        "default_code_area":"+1",
        "local_dial":"720",
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
        "default_code_area":"+1",
        "local_dial":"12651",
        "extension_length":"256256",
        "breakout_code":"15615",
        "voice_mail_pilot":"156156"
      },
      "size":"Medium",
      "unified_messaging":{
        "username":"test_user",
        "password":"test_password",
        "version":"1.52.2",
        "ip_address":"192.226.211.14"
      },
      "platform_test_account":{
        "username":"pf_user",
        "password":"pf_password"
      },
      "customer_notes":"This is a text area to store notes when the build is being created",
      "primary_datacenter":{
        "name":"Denver",
        "host_ip":"192.168.10.2",
        "v_lan":"32",
        "host_gateway":"192.168.10.1",
        "asr_address":"193.168.2.3"
      },
      "secondary_datacenter":{
        "name":"Suwanee",
        "host_ip":"192.168.20.2",
        "v_lan":"32",
        "host_gateway":"192.168.20.1",
        "asr_address":"192.168.20.1"
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
        "ntp_server_1":"ntp01-lou.vmce.westipc.com",
        "ntp_server_2":"ntp02-lou.vmce.westipc.com",
        "ntp_server_3":"ntp03-lou.vmce.westipc.com",
        "ntp_server_4":"ntp04-lou.vmce.westipc.com",
        "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
        "country":"EE.UU.",
        "auto_register_primary":"test_primary",
        "app_user_username":"username_auto_prim"
      },
      "host_data_notes":"This is a text area to store notes when the build is being created",
      "vms":[
        {"id":"cm_publisher",
        "vm_name":"CCM1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.6",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_1",
      "vm_name":"CCM1S01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.7",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cm_subscriber_2",
      "vm_name":"CCCM1P01SWN",
         "host_name":"host_name_suwanee",
         "host_ip":"192.168.20.7",
         "v_lan":"32",
         "host_gateway":"192.168.20.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_1",
      "vm_name":"IMP1P01DEN",
         "host_name":"host_name_denver",
         "host_ip":"192.168.10.8",
         "v_lan":"32",
         "host_gateway":"192.168.10.2",
         "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"imp_subscriber_2",
      "vm_name":"IMP1S01SWN",
        "host_name":"host_name_suwanee",
        "host_ip":"192.168.10.9",
        "v_lan":"32",
        "host_gateway":"192.168.20.2",
        "dns_ntp":{
          "primary_dns":"173.51.23.1",
          "secondary_dns":"173.51.23.2",
          "ntp_server_1":"ntp01-lou.vmce.westipc.com",
          "ntp_server_2":"ntp02-lou.vmce.westipc.com",
          "ntp_server_3":"ntp03-lou.vmce.westipc.com",
          "ntp_server_4":"ntp04-lou.vmce.westipc.com",
          "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
          "country":"EE.UU.",
          "auto_register_primary":"test_primary",
          "app_user_username":"username_auto_prim"
        }
      },
      {"id":"cucx_publisher",
      "vm_name":"CUC1S01DEN",
          "host_name":"host_name_denver",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"cucx_subscriber",
      "vm_name":"CUC1P01SWN",
          "host_name":"host_name_suwanee",
          "host_ip":"192.168.20.10",
          "v_lan":"32",
          "host_gateway":"192.168.20.2",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      },
      {"id":"expressway_1",
      "vm_name":"expressway_1_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }  
      },
      {"id":"expressway_2",
        "vm_name":"expressway_2_name",
          "host_name":"",
          "host_ip":"",
          "v_lan":"",
          "host_gateway":"",
          "dns_ntp":{
            "primary_dns":"173.51.23.1",
            "secondary_dns":"173.51.23.2",
            "ntp_server_1":"ntp01-lou.vmce.westipc.com",
            "ntp_server_2":"ntp02-lou.vmce.westipc.com",
            "ntp_server_3":"ntp03-lou.vmce.westipc.com",
            "ntp_server_4":"ntp04-lou.vmce.westipc.com",
            "ntp_server_5":"ntp05-lou.vmce.westipc.com",
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
            "country":"EE.UU.",
            "auto_register_primary":"test_primary",
            "app_user_username":"username_auto_prim"
          }
      }             
      ],
      "dns_records":{
        "dns_to_ip":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }          
        ],
        "ip_to_dsn":[
          {"dns":"CCM1P01DEN.VMCE",
           "ip":"192.168.10.6"
          },
          {"dns":"CCM1S01DEN.VMCE",
           "ip":"192.168.10.7"
          },
          {"dns":"CCM1S01SWN.VMCE",
           "ip":"192.168.20.7"
          },
          {"dns":"IMP1S01DEN.VMCE",
          "ip":"192.168.10.8"
          },
          {"dns":"IMP1S01SWN.VMCE",
          "ip":"192.168.20.8"
          },
          {"dns":"CUC1P01DEN.VMCE",
          "ip":"192.168.10.9"
          },          
          {"dns":"CUC1S01SWN.VMCE",
          "ip":"192.168.20.9"
          },
          {"dns":"EXP1S01DEN.VMCE",
          "ip":"192.168.10.10"
          },
          {"dns":"EXP1S01SWN.VMCE",
          "ip":"192.168.20.10"
          }         
        ]
      },
      "platform_engineer": "Mills Begant",
      "status": "Completed",
      "completion": "100",
      "elapsed_time":"12:17:53",
      "parameters_required":"79",
      "parameters_completed":"79"
    }	
        
    this.builds.push(b1);
    this.builds.push(b2);
    this.builds.push(b3);
    this.builds.push(b4);
    this.builds.push(b5);
    this.builds.push(b6);
    this.builds.push(b7);

    this.storage.set(this.STORAGE_BUILDS,this.builds);
    this.buildsSource.next(this.builds);

    var logs1:Logs ={
      "build_id":"CYB7PSOC-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
      "validationLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T16:04:40"),
         "title":"Checking customer information details",
         "type":"Validation Log",
         "details":"Validating the customer information is consistent and there is no incompatible data",
         "module":"Customer Information",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T16:07:42"),
         "title":"Checking infrastructure data",
         "type":"Validation Log",
         "details":"Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
         "module":"Infrastructure",
         "status":"Sucess"
        },
        {"id":"3",
          "date":new Date("2019-12-31T16:10:42"),
          "title":"Cheking host data information",
          "type":"Validation Log",
          "details":"Checking the host data information matches with the current network",
          "module":"Host Data",
          "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T16:15:42"),
          "title":"Checking generated VM model",
          "type":"Validation Log",
          "details":"Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
          "module":"VM's model",
          "status":"Success"
        },
        {"id":"5",
          "date":new Date("2019-12-31T16:25:42"),
          "title":"Checking DNS Records information",
          "type":"Validation Log",
          "details":"Checking the whole DNS records table infromation have been generated properly",
          "module":"DNS Records",
          "status":"Success"
        },
        {"id":"6",
          "date":new Date("2019-12-31T16:32:42"),
          "title":"Checking ASR/SONUS data",
          "type":"Validation Log",
          "details":"Validating consistency between configuration and ASR/SONUS avaiable information",
          "module":"ASR/SONUS",
          "status":"Success"
        }
      ],
      "executionLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T18:00:42"),
         "title":"Checking disk availability",
         "type":"Execution Log",
         "details":"Validating that there's enough available disk space to hold the VMs that are going to be cloned",
         "module":"Disk availability",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T18:15:52"),
         "title":"Creating folders",
         "type":"Execution Log",
         "details":"Creating all folders needed to hold the new VM's after they are cloned",
         "module":"Folders",
         "status":"Success"
        },
        {"id":"3",
        "date":new Date("2019-12-31T18:37:09"),
         "title":"Creating Resource Pool",
         "type":"Execution Log",
         "details":"Creating the necessary resource pool to manage all the VM's to be created",
         "module":"Resource Pool",
         "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T19:45:08"),
          "title":"Creating Answer files",
          "type":"Execution Log",
          "details":"Creating answer files taking the information put in the configuration for each MV",
          "module":"Answer files",
          "status":"Success"
        },
        {"id":"5",
         "date":new Date("2019-12-31T20:08:17"),
         "title":"Creating Floppy disk",
         "type":"Execution Log",
         "details":"Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
         "module":"Floppy",
         "status":"Success"
        },
        {"id":"6",
         "date":new Date("2019-12-31T20:35:32"),
         "title":"Configuring Network",
         "type":"Execution Log",
         "details":"Configuring switches and network access",
         "module":"Network configuration",
         "status":"Success"
        },
        {"id":"7",
         "date":new Date("2019-12-31T21:15:20"),
         "title":"Cloning VM's",
         "type":"Execution Log",
         "details":"Clonning all the VM's within the model",
         "module":"Clone VM",
         "status":"Success"
        },
        {"id":"8",
          "date":new Date("2019-12-31T21:40:42"),
          "title":"Configuring VM's",
          "type":"Execution Log",
          "details":"Configuring each VM taking into account the model created",
          "module":"VM configuration",
          "status":"Running"
        }      
      ]
    }
    var logs2:Logs ={
      "build_id":"CYB7PSOC-0KAC-8Q56-JT3E-V63Y8CAKYK7B",
      "validationLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T16:04:40"),
         "title":"Checking customer information details",
         "type":"Validation Log",
         "details":"Validating the customer information is consistent and there is no incompatible data",
         "module":"Customer Information",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T16:07:42"),
         "title":"Checking infrastructure data",
         "type":"Validation Log",
         "details":"Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
         "module":"Infrastructure",
         "status":"Sucess"
        },
        {"id":"3",
          "date":new Date("2019-12-31T16:10:42"),
          "title":"Cheking host data information",
          "type":"Validation Log",
          "details":"Checking the host data information matches with the current network",
          "module":"Host Data",
          "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T16:15:42"),
          "title":"Checking generated VM model",
          "type":"Validation Log",
          "details":"Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
          "module":"VM's model",
          "status":"Success"
        },
        {"id":"5",
          "date":new Date("2019-12-31T16:25:42"),
          "title":"Checking DNS Records information",
          "type":"Validation Log",
          "details":"Checking the whole DNS records table infromation have been generated properly",
          "module":"DNS Records",
          "status":"Success"
        },
        {"id":"6",
          "date":new Date("2019-12-31T16:32:42"),
          "title":"Checking ASR/SONUS data",
          "type":"Validation Log",
          "details":"Validating consistency between configuration and ASR/SONUS avaiable information",
          "module":"ASR/SONUS",
          "status":"Success"
        }
      ],
      "executionLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T18:00:42"),
         "title":"Checking disk availability",
         "type":"Execution Log",
         "details":"Validating that there's enough available disk space to hold the VMs that are going to be cloned",
         "module":"Disk availability",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T18:15:52"),
         "title":"Creating folders",
         "type":"Execution Log",
         "details":"Creating all folders needed to hold the new VM's after they are cloned",
         "module":"Folders",
         "status":"Success"
        },
        {"id":"3",
        "date":new Date("2019-12-31T18:37:09"),
         "title":"Creating Resource Pool",
         "type":"Execution Log",
         "details":"Creating the necessary resource pool to manage all the VM's to be created",
         "module":"Resource Pool",
         "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T19:45:08"),
          "title":"Creating Answer files",
          "type":"Execution Log",
          "details":"Creating answer files taking the information put in the configuration for each MV",
          "module":"Answer files",
          "status":"Success"
        },
        {"id":"5",
         "date":new Date("2019-12-31T20:08:17"),
         "title":"Creating Floppy disk",
         "type":"Execution Log",
         "details":"Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
         "module":"Floppy",
         "status":"Success"
        },
        {"id":"6",
         "date":new Date("2019-12-31T20:35:32"),
         "title":"Configuring Network",
         "type":"Execution Log",
         "details":"Configuring switches and network access",
         "module":"Network configuration",
         "status":"Success"
        },
        {"id":"7",
         "date":new Date("2019-12-31T21:15:20"),
         "title":"Cloning VM's",
         "type":"Execution Log",
         "details":"Clonning all the VM's within the model",
         "module":"Clone VM",
         "status":"Success"
        },
        {"id":"8",
          "date":new Date("2019-12-31T21:40:42"),
          "title":"Configuring VM's",
          "type":"Execution Log",
          "details":"Configuring each VM taking into account the model created",
          "module":"VM configuration",
          "status":"Running"
        }      
      ]
    }
    var logs3:Logs ={
      "build_id":"CYB7PSOC-0KAC-8Q56-JT3E-K7BV63Y8CAKY",
      "validationLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T16:04:40"),
         "title":"Checking customer information details",
         "type":"Validation Log",
         "details":"Validating the customer information is consistent and there is no incompatible data",
         "module":"Customer Information",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T16:07:42"),
         "title":"Checking infrastructure data",
         "type":"Validation Log",
         "details":"Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
         "module":"Infrastructure",
         "status":"Sucess"
        },
        {"id":"3",
          "date":new Date("2019-12-31T16:10:42"),
          "title":"Cheking host data information",
          "type":"Validation Log",
          "details":"Checking the host data information matches with the current network",
          "module":"Host Data",
          "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T16:15:42"),
          "title":"Checking generated VM model",
          "type":"Validation Log",
          "details":"Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
          "module":"VM's model",
          "status":"Success"
        },
        {"id":"5",
          "date":new Date("2019-12-31T16:25:42"),
          "title":"Checking DNS Records information",
          "type":"Validation Log",
          "details":"Checking the whole DNS records table infromation have been generated properly",
          "module":"DNS Records",
          "status":"Success"
        },
        {"id":"6",
          "date":new Date("2019-12-31T16:32:42"),
          "title":"Checking ASR/SONUS data",
          "type":"Validation Log",
          "details":"Validating consistency between configuration and ASR/SONUS avaiable information",
          "module":"ASR/SONUS",
          "status":"Success"
        }
      ],
      "executionLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T18:00:42"),
         "title":"Checking disk availability",
         "type":"Execution Log",
         "details":"Validating that there's enough available disk space to hold the VMs that are going to be cloned",
         "module":"Disk availability",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T18:15:52"),
         "title":"Creating folders",
         "type":"Execution Log",
         "details":"Creating all folders needed to hold the new VM's after they are cloned",
         "module":"Folders",
         "status":"Success"
        },
        {"id":"3",
        "date":new Date("2019-12-31T18:37:09"),
         "title":"Creating Resource Pool",
         "type":"Execution Log",
         "details":"Creating the necessary resource pool to manage all the VM's to be created",
         "module":"Resource Pool",
         "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T19:45:08"),
          "title":"Creating Answer files",
          "type":"Execution Log",
          "details":"Creating answer files taking the information put in the configuration for each MV",
          "module":"Answer files",
          "status":"Success"
        },
        {"id":"5",
         "date":new Date("2019-12-31T20:08:17"),
         "title":"Creating Floppy disk",
         "type":"Execution Log",
         "details":"Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
         "module":"Floppy",
         "status":"Success"
        },
        {"id":"6",
         "date":new Date("2019-12-31T20:35:32"),
         "title":"Configuring Network",
         "type":"Execution Log",
         "details":"Configuring switches and network access",
         "module":"Network configuration",
         "status":"Success"
        },
        {"id":"7",
         "date":new Date("2019-12-31T21:15:20"),
         "title":"Cloning VM's",
         "type":"Execution Log",
         "details":"Clonning all the VM's within the model",
         "module":"Clone VM",
         "status":"Success"
        },
        {"id":"8",
          "date":new Date("2019-12-31T21:40:42"),
          "title":"Configuring VM's",
          "type":"Execution Log",
          "details":"Configuring each VM taking into account the model created",
          "module":"VM configuration",
          "status":"Running"
        }      
      ]
    }
    var logs4:Logs ={
      "build_id":"PSOCCYB7-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
      "validationLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T16:04:40"),
         "title":"Checking customer information details",
         "type":"Validation Log",
         "details":"Validating the customer information is consistent and there is no incompatible data",
         "module":"Customer Information",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T16:07:42"),
         "title":"Checking infrastructure data",
         "type":"Validation Log",
         "details":"Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
         "module":"Infrastructure",
         "status":"Sucess"
        },
        {"id":"3",
          "date":new Date("2019-12-31T16:10:42"),
          "title":"Cheking host data information",
          "type":"Validation Log",
          "details":"Checking the host data information matches with the current network",
          "module":"Host Data",
          "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T16:15:42"),
          "title":"Checking generated VM model",
          "type":"Validation Log",
          "details":"Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
          "module":"VM's model",
          "status":"Success"
        },
        {"id":"5",
          "date":new Date("2019-12-31T16:25:42"),
          "title":"Checking DNS Records information",
          "type":"Validation Log",
          "details":"Checking the whole DNS records table infromation have been generated properly",
          "module":"DNS Records",
          "status":"Success"
        },
        {"id":"6",
          "date":new Date("2019-12-31T16:32:42"),
          "title":"Checking ASR/SONUS data",
          "type":"Validation Log",
          "details":"Validating consistency between configuration and ASR/SONUS avaiable information",
          "module":"ASR/SONUS",
          "status":"Success"
        }
      ],
      "executionLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T18:00:42"),
         "title":"Checking disk availability",
         "type":"Execution Log",
         "details":"Validating that there's enough available disk space to hold the VMs that are going to be cloned",
         "module":"Disk availability",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T18:15:52"),
         "title":"Creating folders",
         "type":"Execution Log",
         "details":"Creating all folders needed to hold the new VM's after they are cloned",
         "module":"Folders",
         "status":"Success"
        },
        {"id":"3",
        "date":new Date("2019-12-31T18:37:09"),
         "title":"Creating Resource Pool",
         "type":"Execution Log",
         "details":"Creating the necessary resource pool to manage all the VM's to be created",
         "module":"Resource Pool",
         "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T19:45:08"),
          "title":"Creating Answer files",
          "type":"Execution Log",
          "details":"Creating answer files taking the information put in the configuration for each MV",
          "module":"Answer files",
          "status":"Success"
        },
        {"id":"5",
         "date":new Date("2019-12-31T20:08:17"),
         "title":"Creating Floppy disk",
         "type":"Execution Log",
         "details":"Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
         "module":"Floppy",
         "status":"Success"
        },
        {"id":"6",
         "date":new Date("2019-12-31T20:35:32"),
         "title":"Configuring Network",
         "type":"Execution Log",
         "details":"Configuring switches and network access",
         "module":"Network configuration",
         "status":"Success"
        },
        {"id":"7",
         "date":new Date("2019-12-31T21:15:20"),
         "title":"Cloning VM's",
         "type":"Execution Log",
         "details":"Clonning all the VM's within the model",
         "module":"Clone VM",
         "status":"Success"
        },
        {"id":"8",
          "date":new Date("2019-12-31T21:40:42"),
          "title":"Configuring VM's",
          "type":"Execution Log",
          "details":"Configuring each VM taking into account the model created",
          "module":"VM configuration",
          "status":"Running"
        }      
      ]
    }
    var logs5:Logs ={
      "build_id":"CYB7PSOC-JT3E-8Q56-JT3E-3Y8CAKYK7BV6",
      "validationLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T16:04:40"),
         "title":"Checking customer information details",
         "type":"Validation Log",
         "details":"Validating the customer information is consistent and there is no incompatible data",
         "module":"Customer Information",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T16:07:42"),
         "title":"Checking infrastructure data",
         "type":"Validation Log",
         "details":"Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
         "module":"Infrastructure",
         "status":"Sucess"
        },
        {"id":"3",
          "date":new Date("2019-12-31T16:10:42"),
          "title":"Cheking host data information",
          "type":"Validation Log",
          "details":"Checking the host data information matches with the current network",
          "module":"Host Data",
          "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T16:15:42"),
          "title":"Checking generated VM model",
          "type":"Validation Log",
          "details":"Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
          "module":"VM's model",
          "status":"Success"
        },
        {"id":"5",
          "date":new Date("2019-12-31T16:25:42"),
          "title":"Checking DNS Records information",
          "type":"Validation Log",
          "details":"Checking the whole DNS records table infromation have been generated properly",
          "module":"DNS Records",
          "status":"Success"
        },
        {"id":"6",
          "date":new Date("2019-12-31T16:32:42"),
          "title":"Checking ASR/SONUS data",
          "type":"Validation Log",
          "details":"Validating consistency between configuration and ASR/SONUS avaiable information",
          "module":"ASR/SONUS",
          "status":"Success"
        }
      ],
      "executionLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T18:00:42"),
         "title":"Checking disk availability",
         "type":"Execution Log",
         "details":"Validating that there's enough available disk space to hold the VMs that are going to be cloned",
         "module":"Disk availability",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T18:15:52"),
         "title":"Creating folders",
         "type":"Execution Log",
         "details":"Creating all folders needed to hold the new VM's after they are cloned",
         "module":"Folders",
         "status":"Success"
        },
        {"id":"3",
        "date":new Date("2019-12-31T18:37:09"),
         "title":"Creating Resource Pool",
         "type":"Execution Log",
         "details":"Creating the necessary resource pool to manage all the VM's to be created",
         "module":"Resource Pool",
         "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T19:45:08"),
          "title":"Creating Answer files",
          "type":"Execution Log",
          "details":"Creating answer files taking the information put in the configuration for each MV",
          "module":"Answer files",
          "status":"Success"
        },
        {"id":"5",
         "date":new Date("2019-12-31T20:08:17"),
         "title":"Creating Floppy disk",
         "type":"Execution Log",
         "details":"Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
         "module":"Floppy",
         "status":"Success"
        },
        {"id":"6",
         "date":new Date("2019-12-31T20:35:32"),
         "title":"Configuring Network",
         "type":"Execution Log",
         "details":"Configuring switches and network access",
         "module":"Network configuration",
         "status":"Success"
        },
        {"id":"7",
         "date":new Date("2019-12-31T21:15:20"),
         "title":"Cloning VM's",
         "type":"Execution Log",
         "details":"Clonning all the VM's within the model",
         "module":"Clone VM",
         "status":"Success"
        },
        {"id":"8",
          "date":new Date("2019-12-31T21:40:42"),
          "title":"Configuring VM's",
          "type":"Execution Log",
          "details":"Configuring each VM taking into account the model created",
          "module":"VM configuration",
          "status":"Running"
        }      
      ]
    }
    var logs6:Logs ={
      "build_id":"CYB7PSOC-0KAC-8Q56-8Q56-3Y8CAKYK7BV6",
      "validationLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T16:04:40"),
         "title":"Checking customer information details",
         "type":"Validation Log",
         "details":"Validating the customer information is consistent and there is no incompatible data",
         "module":"Customer Information",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T16:07:42"),
         "title":"Checking infrastructure data",
         "type":"Validation Log",
         "details":"Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
         "module":"Infrastructure",
         "status":"Sucess"
        },
        {"id":"3",
          "date":new Date("2019-12-31T16:10:42"),
          "title":"Cheking host data information",
          "type":"Validation Log",
          "details":"Checking the host data information matches with the current network",
          "module":"Host Data",
          "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T16:15:42"),
          "title":"Checking generated VM model",
          "type":"Validation Log",
          "details":"Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
          "module":"VM's model",
          "status":"Success"
        },
        {"id":"5",
          "date":new Date("2019-12-31T16:25:42"),
          "title":"Checking DNS Records information",
          "type":"Validation Log",
          "details":"Checking the whole DNS records table infromation have been generated properly",
          "module":"DNS Records",
          "status":"Success"
        },
        {"id":"6",
          "date":new Date("2019-12-31T16:32:42"),
          "title":"Checking ASR/SONUS data",
          "type":"Validation Log",
          "details":"Validating consistency between configuration and ASR/SONUS avaiable information",
          "module":"ASR/SONUS",
          "status":"Success"
        }
      ],
      "executionLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T18:00:42"),
         "title":"Checking disk availability",
         "type":"Execution Log",
         "details":"Validating that there's enough available disk space to hold the VMs that are going to be cloned",
         "module":"Disk availability",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T18:15:52"),
         "title":"Creating folders",
         "type":"Execution Log",
         "details":"Creating all folders needed to hold the new VM's after they are cloned",
         "module":"Folders",
         "status":"Success"
        },
        {"id":"3",
        "date":new Date("2019-12-31T18:37:09"),
         "title":"Creating Resource Pool",
         "type":"Execution Log",
         "details":"Creating the necessary resource pool to manage all the VM's to be created",
         "module":"Resource Pool",
         "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T19:45:08"),
          "title":"Creating Answer files",
          "type":"Execution Log",
          "details":"Creating answer files taking the information put in the configuration for each MV",
          "module":"Answer files",
          "status":"Success"
        },
        {"id":"5",
         "date":new Date("2019-12-31T20:08:17"),
         "title":"Creating Floppy disk",
         "type":"Execution Log",
         "details":"Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
         "module":"Floppy",
         "status":"Success"
        },
        {"id":"6",
         "date":new Date("2019-12-31T20:35:32"),
         "title":"Configuring Network",
         "type":"Execution Log",
         "details":"Configuring switches and network access",
         "module":"Network configuration",
         "status":"Success"
        },
        {"id":"7",
         "date":new Date("2019-12-31T21:15:20"),
         "title":"Cloning VM's",
         "type":"Execution Log",
         "details":"Clonning all the VM's within the model",
         "module":"Clone VM",
         "status":"Success"
        },
        {"id":"8",
          "date":new Date("2019-12-31T21:40:42"),
          "title":"Configuring VM's",
          "type":"Execution Log",
          "details":"Configuring each VM taking into account the model created",
          "module":"VM configuration",
          "status":"Running"
        }      
      ]
    }
    var logs7:Logs ={
      "build_id":"CYB7PSOC-8Q56-8Q56-JT3E-3Y8CAKYK7BV6",
      "validationLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T16:04:40"),
         "title":"Checking customer information details",
         "type":"Validation Log",
         "details":"Validating the customer information is consistent and there is no incompatible data",
         "module":"Customer Information",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T16:07:42"),
         "title":"Checking infrastructure data",
         "type":"Validation Log",
         "details":"Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
         "module":"Infrastructure",
         "status":"Sucess"
        },
        {"id":"3",
          "date":new Date("2019-12-31T16:10:42"),
          "title":"Cheking host data information",
          "type":"Validation Log",
          "details":"Checking the host data information matches with the current network",
          "module":"Host Data",
          "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T16:15:42"),
          "title":"Checking generated VM model",
          "type":"Validation Log",
          "details":"Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
          "module":"VM's model",
          "status":"Success"
        },
        {"id":"5",
          "date":new Date("2019-12-31T16:25:42"),
          "title":"Checking DNS Records information",
          "type":"Validation Log",
          "details":"Checking the whole DNS records table infromation have been generated properly",
          "module":"DNS Records",
          "status":"Success"
        },
        {"id":"6",
          "date":new Date("2019-12-31T16:32:42"),
          "title":"Checking ASR/SONUS data",
          "type":"Validation Log",
          "details":"Validating consistency between configuration and ASR/SONUS avaiable information",
          "module":"ASR/SONUS",
          "status":"Success"
        }
      ],
      "executionLogs":[
        {"id":"1",
         "date":new Date("2019-12-31T18:00:42"),
         "title":"Checking disk availability",
         "type":"Execution Log",
         "details":"Validating that there's enough available disk space to hold the VMs that are going to be cloned",
         "module":"Disk availability",
         "status":"Success"
        },
        {"id":"2",
        "date":new Date("2019-12-31T18:15:52"),
         "title":"Creating folders",
         "type":"Execution Log",
         "details":"Creating all folders needed to hold the new VM's after they are cloned",
         "module":"Folders",
         "status":"Success"
        },
        {"id":"3",
        "date":new Date("2019-12-31T18:37:09"),
         "title":"Creating Resource Pool",
         "type":"Execution Log",
         "details":"Creating the necessary resource pool to manage all the VM's to be created",
         "module":"Resource Pool",
         "status":"Success"
        },
        {"id":"4",
          "date":new Date("2019-12-31T19:45:08"),
          "title":"Creating Answer files",
          "type":"Execution Log",
          "details":"Creating answer files taking the information put in the configuration for each MV",
          "module":"Answer files",
          "status":"Success"
        },
        {"id":"5",
         "date":new Date("2019-12-31T20:08:17"),
         "title":"Creating Floppy disk",
         "type":"Execution Log",
         "details":"Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
         "module":"Floppy",
         "status":"Success"
        },
        {"id":"6",
         "date":new Date("2019-12-31T20:35:32"),
         "title":"Configuring Network",
         "type":"Execution Log",
         "details":"Configuring switches and network access",
         "module":"Network configuration",
         "status":"Success"
        },
        {"id":"7",
         "date":new Date("2019-12-31T21:15:20"),
         "title":"Cloning VM's",
         "type":"Execution Log",
         "details":"Clonning all the VM's within the model",
         "module":"Clone VM",
         "status":"Success"
        },
        {"id":"8",
          "date":new Date("2019-12-31T21:40:42"),
          "title":"Configuring VM's",
          "type":"Execution Log",
          "details":"Configuring each VM taking into account the model created",
          "module":"VM configuration",
          "status":"Running"
        }      
      ]
    }

    this.logs.push(logs1);
    this.logs.push(logs2);
    this.logs.push(logs3);
    this.logs.push(logs4);
    this.logs.push(logs5);
    this.logs.push(logs6);
    this.logs.push(logs7);

    this.storage.set(this.STORAGE_LOGS,this.logs);
  }
}

