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

export class Build {
    id: string

    customer: Customer
    domain: Domain
    active_directory: ActiveDirectory
    size: string
    unified_messaging: UnifiedMessaging
    platform_test_account: PlatformTestAccount
    customer_notes: string

    primary_datacenter: Datacenter
    secondary_datacenter: Datacenter
    infrastructure: Infrastructure
    additional_network_data: AdditionalNetworkData
    mra_expressway: MRAExpressway
    additional_services: AdditionalServices
    infrastructure_notes: string

    dns_ntp: DNSNTP
    host_data: HostData
    certificates: Certificates
    host_data_notes: string

    vms: VirtualMachine[]

    dns_records: DNSRecords

    platform_engineer: string
    status: string
    elapsed_time: string
    completion: string
    parameters_completed: string
    parameters_required: string

    constructor(build?: Build) {
        if (build) {
            for (const prop in build) {
                if (build.hasOwnProperty(prop)) {
                    this[prop] = build[prop];
                }
            }
        }
    }

    getFormDataBuild(): any {
        const unified_messaging = this.unified_messaging ? 
            {
                username: this.unified_messaging.username,
                password: this.unified_messaging.password
            }
            : null;
        return {
            customer: this.customer || null,
            domain: this.domain || null,
            size: this.size || null,
            unified_messaging: unified_messaging,
            platform_test_account: this.platform_test_account || null,
            customer_notes: this.customer_notes || null,
            primary_datacenter: this.primary_datacenter || null,
            secondary_datacenter: this.secondary_datacenter || null,
            infrastructure: this.infrastructure || null,
            additional_network_data: this.additional_network_data || null,
            mra_expressway: this.mra_expressway || null,
            additional_services: this.additional_services || null,
            infrastructure_notes: this.infrastructure_notes || null,
            dns_ntp: this.dns_ntp || null,
            host_data: this.host_data || null,
            certificates: this.certificates || null,
            host_data_notes: this.host_data_notes || null
        };
    }

    setFormDataBuild(datos: any) {
        this.customer = datos.customer;
        this.domain = datos.domain;
        this.size = datos.size;
        this.unified_messaging.username = datos.unified_messaging.username;
        this.unified_messaging.password = datos.unified_messaging.password;
        this.platform_test_account = datos.platform_test_account;
        this.customer_notes = datos.customer_notes;
        this.primary_datacenter = datos.primary_datacenter;
        this.secondary_datacenter = datos.secondary_datacenter;
        this.infrastructure = datos.infrastructure;
        this.additional_network_data = datos.additional_network_data;
        this.mra_expressway = datos.mra_expressway;
        this.additional_services = datos.additional_services;
        this.infrastructure_notes = datos.infrastructure_notes;
        this.dns_ntp = datos.dns_ntp;
        this.host_data = datos.host_data;
        this.certificates = datos.certificates;
        this.host_data_notes = datos.host_data_notes;
    }

    //Temp function
    setInitialData(datos: any) {
        this.id = datos.id;

        this.customer = datos.customer;
        this.domain = datos.domain;
        this.active_directory = datos.active_directory;
        this.size = datos.size;
        this.unified_messaging = datos.unified_messaging;
        this.platform_test_account = datos.platform_test_account;
        this.customer_notes = datos.customer_notes;

        this.primary_datacenter = datos.primary_datacenter;
        this.secondary_datacenter = datos.secondary_datacenter;
        this.infrastructure = datos.infrastructure;
        this.additional_network_data = datos.additional_network_data;
        this.mra_expressway = datos.mra_expressway;
        this.additional_services = datos.additional_services;
        this.infrastructure_notes = datos.infrastructure_notes;

        this.dns_ntp = datos.dns_ntp;
        this.host_data = datos.host_data;
        this.certificates = datos.certificates;
        this.host_data_notes = datos.host_data_notes;

        this.vms = datos.vms;

        this.dns_records = datos.dns_records;

        this.platform_engineer = datos.platform_engineer;
        this.status = datos.status;
        this.elapsed_time = datos.elapsed_time;
        this.completion = datos.completion;
        this.parameters_completed = datos.parameters_completed;
        this.parameters_required = datos.parameters_required;
    }
}