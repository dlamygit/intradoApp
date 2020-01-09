import { DNSNTP } from './DNSNTP'
import { HostData } from './Hostdata'
import { Certificates } from './Certificates'

export class VirtualMachine {
    id: string

    vm_name: string
    host_name: string

    host_ip: string
    v_lan: string
    host_gateway: string

    dns_ntp: DNSNTP
    host_data: HostData
    certificates: Certificates
}