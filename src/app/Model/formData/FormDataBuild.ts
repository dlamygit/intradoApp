import { Customer } from '../Customer'
import { FormUnifiedMessaging } from './FormUnifiedMessaging'
import { PlatformTestAccount } from '../PlatformTestAccount'
import { Datacenter } from '../Datacenter'
import { Infrastructure } from '../Infrastructure'
import { AdditionalNetworkData } from '../AdditionalNetowrkData'
import { MRAExpressway } from '../MRAExpressway'
import { AdditionalServices } from '../AdditionalServices'
import { DNSNTP } from '../DNSNTP'
import { HostData } from '../Hostdata'
import { Certificates } from '../Certificates'
import { Domain } from '../Domain'

export interface FormDataBuild {
    customer: Customer;
    domain: Domain;
    size: string;
    unified_messaging: FormUnifiedMessaging;
    platform_test_account: PlatformTestAccount;
    customer_notes: string;
    primary_datacenter: Datacenter;
    secondary_datacenter: Datacenter;
    infrastructure: Infrastructure;
    additional_network_data: AdditionalNetworkData;
    mra_expressway: MRAExpressway;
    additional_services: AdditionalServices;
    infrastructure_notes: string;
    dns_ntp: DNSNTP;
    host_data: HostData;
    certificates: Certificates;
    host_data_notes: string;
}
