import { DNSNTP } from './DNSNTP'
import { HostData } from './Hostdata'
import { Certificates } from './Certificates'

export class VirtualMachine{

    id:String

    vm_name: String
    host_name: String
    
    host_ip: String
    v_lan: String
    host_gateway: String
    
    dns_ntp: DNSNTP
    host_data: HostData
    certificates: Certificates

}