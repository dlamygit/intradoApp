import { Customer } from './Customer'
import { Domain } from './Domain'
import { ActiveDirectory } from './ActiveDirectory'
import { UnifiedMessaging } from './UnifiedMessaging'
import { PlatformTestAccount } from './PlatformTestAccount'
import { Datacenter } from './Datacenter'
import { Infrastructure } from './Infrastructure'
import { AdditionalNetworkData } from './AdditionalNetowrkData'
import { MRAExpressway } from './MRAExpressway'
import { AdditionalServices } from './AdditionalServices'
import { DNSNTP } from './DNSNTP'
import { HostData } from './Hostdata'
import { Certificates } from './Certificates'
import { VirtualMachine } from './VirtualMachine'
import { DNSRecords } from './DNSRecords'

export class Build{

    id: string
    
    customer: Customer
    domain: Domain
    active_directory: ActiveDirectory
    size: String
    unified_messaging: UnifiedMessaging
    platform_test_account: PlatformTestAccount
    customer_notes: String

    primary_datacenter: Datacenter
    secondary_datacenter: Datacenter
    infrastructure: Infrastructure
    additional_network_data: AdditionalNetworkData
    mra_expressway: MRAExpressway
    additional_services: AdditionalServices
    infrastructure_notes: String

    dns_ntp: DNSNTP
    host_data: HostData
    certificates: Certificates
    host_data_notes: String

    vms: VirtualMachine[]
    
    dns_records: DNSRecords

    platform_engineer: String
    status: String
    completion: String

}