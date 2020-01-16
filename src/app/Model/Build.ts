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
import { DNSRecords } from './DNSRecords'
import { VirtualMachineModel } from './VirtualMachineModel'

export class Build {
    id: string;

    customer: Customer;
    domain: Domain;
    active_directory: ActiveDirectory;
    size: string;
    unified_messaging: UnifiedMessaging;
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

    vms: VirtualMachineModel;

    dns_records: DNSRecords;

    platform_engineer: string;
    status: string;
    elapsed_time: string;
    completion: string;
    parameters_completed: string;
    parameters_required: string;

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
        return {
            customer_name: this.customer.name || null,
            customer_id_letters: this.customer.id_letters || null,
            customer_id_numbers: this.customer.id_numbers || null,
            customer_ITC_location: this.customer.ITC_location || null,
            customer_address_1: this.customer.address_1 || null,
            customer_address_2: this.customer.address_2 || null,
            customer_city: this.customer.city || null,
            customer_state: this.customer.state || null,
            customer_zip_code: this.customer.zip_code || null,
            customer_timezone: this.customer.timezone || null,
            customer_default_code_area: this.customer.default_code_area || null,
            customer_local_dial: this.customer.local_dial || null,
            customer_extension_length: this.customer.extension_length || null,
            customer_breakout_code: this.customer.breakout_code || null,
            customer_voice_mail_pilot: this.customer.voice_mail_pilot || null,
            server_domain: this.domain.server_domain || null,
            presence_domain: this.domain.presence_domain || null,
            size: this.size || null,
            unified_messaging_username: this.unified_messaging.username || null,
            unified_messaging_password: this.unified_messaging.password || null,
            platform_test_account_username: this.platform_test_account.username || null,
            platform_test_account_password: this.platform_test_account.password || null,
            customer_notes: this.customer_notes || null,
            primary_datacenter_name: this.primary_datacenter.name || null,
            primary_datacenter_host_ip: this.primary_datacenter.host_ip || null,
            primary_datacenter_v_lan: this.primary_datacenter.v_lan || null,
            primary_datacenter_host_gateway: this.primary_datacenter.host_gateway || null,
            primary_datacenter_asr_address: this.primary_datacenter.asr_address || null,
            secondary_datacenter_name: this.secondary_datacenter.name || null,
            secondary_datacenter_host_ip: this.secondary_datacenter.host_ip || null,
            secondary_datacenter_v_lan: this.secondary_datacenter.v_lan || null,
            secondary_datacenter_host_gateway: this.secondary_datacenter.host_gateway || null,
            secondary_datacenter_asr_address: this.secondary_datacenter.asr_address || null,
            infrastructure_cluster: this.infrastructure.cluster || null,
            infrastructure_datacenter: this.infrastructure.datacenter || null,
            infrastructure_datastore: this.infrastructure.datastore || null,
            additional_network_data_nat_box_ip: this.additional_network_data.nat_box_ip || null,
            additional_network_data_vrf: this.additional_network_data.vrf || null,
            mra_expressway_primary_dc_external_ip: this.mra_expressway.primary_dc_external_ip || null,
            mra_expressway_primary_dc_internal_ip: this.mra_expressway.primary_dc_internal_ip || null,
            mra_expressway_secondary_dc_external_ip: this.mra_expressway.secondary_dc_external_ip || null,
            mra_expressway_secondary_dc_internal_ip: this.mra_expressway.secondary_dc_internal_ip || null,
            additional_services_cuaca: this.additional_services.cuaca || null,
            additional_services_egw: this.additional_services.egw || null,
            additional_services_expressway: this.additional_services.expressway || null,
            additional_services_hybrid_services: this.additional_services.hybrid_services || null,
            additional_services_singlewire: this.additional_services.singlewire || null,
            infrastructure_notes: this.infrastructure_notes || null,
            dns_ntp_primary_dns: this.dns_ntp.primary_dns || null,
            dns_ntp_secondary_dns: this.dns_ntp.secondary_dns || null,
            dns_ntp_server_1: this.dns_ntp.ntp_server_1 || null,
            dns_ntp_server_2: this.dns_ntp.ntp_server_2 || null,
            dns_ntp_server_3: this.dns_ntp.ntp_server_3 || null,
            dns_ntp_server_4: this.dns_ntp.ntp_server_4 || null,
            dns_ntp_server_5: this.dns_ntp.ntp_server_5 || null,
            host_data_admin: this.host_data.admin || null,
            host_data_app_user_password: this.host_data.app_user_password || null,
            host_data_city: this.host_data.city || null,
            host_data_continent: this.host_data.continent || null,
            host_data_password: this.host_data.password || null,
            host_data_security_password: this.host_data.security_password || null,
            host_data_timezone: this.host_data.timezone || null,
            certificates_app_user_username: this.certificates.app_user_username || null,
            certificates_auto_register_primary: this.certificates.auto_register_primary || null,
            certificates_country: this.certificates.country || null,
            certificates_location: this.certificates.location || null,
            certificates_organization: this.certificates.organization || null,
            certificates_state: this.certificates.state || null,
            certificates_unit: this.certificates.unit || null,
            host_data_notes: this.host_data_notes || null
        };
    }

    setFormDataBuild(datos: any) {
        if (this.customer) {
            this.customer.name = datos.customer_name;
            this.customer.id_letters = datos.customer_id_letters;
            this.customer.ITC_location = datos.customer_ITC_location;
            this.customer.address_1 = datos.customer_address_1;
            this.customer.address_2 = datos.customer_address_2;
            this.customer.city = datos.customer_city;
            this.customer.state = datos.customer_state;
            this.customer.zip_code = datos.customer_zip_code;
            this.customer.timezone = datos.customer_timezone;
            this.customer.default_code_area = datos.customer_default_code_area;
            this.customer.local_dial = datos.customer_local_dial;
            this.customer.extension_length = datos.customer_extension_length;
            this.customer.breakout_code = datos.customer_breakout_code;
            this.customer.voice_mail_pilot = datos.customer_voice_mail_pilot;
        } else {
            (this.customer as any) = {
                name: datos.customer_name,
                id_letters: datos.customer_id_letters,
                ITC_location: datos.customer_ITC_location,
                address_1: datos.customer_address_1,
                address_2: datos.customer_address_2,
                city: datos.customer_city,
                state: datos.customer_state,
                zip_code: datos.customer_zip_code,
                timezone: datos.customer_timezone,
                default_code_area: datos.customer_default_code_area,
                local_dial: datos.customer_local_dial,
                extension_length: datos.customer_extension_length,
                breakout_code: datos.customer_breakout_code,
                voice_mail_pilot: datos.customer_voice_mail_pilot
            };
        }
        if (this.domain) {
            this.domain.server_domain = datos.server_domain;
            this.domain.presence_domain= datos.presence_domain;
        } else {
            (this.domain as any) = {
                server_domain: datos.server_domain,
                presence_domain: datos.presence_domain
            };
        }
        this.size = datos.size;
        if (this.unified_messaging) {
            this.unified_messaging.username = datos.unified_messaging_username;
            this.unified_messaging.password= datos.unified_messaging_password;
        } else {
            (this.unified_messaging as any) = {
                username: datos.unified_messaging_username,
                password: datos.unified_messaging_password
            };
        }
        if (this.platform_test_account) {
            this.platform_test_account.username = datos.platform_test_account_username;
            this.platform_test_account.password = datos.platform_test_account_password;
        } else {
            (this.platform_test_account as any) = {
                username: datos.platform_test_account_username,
                password: datos.platform_test_account_password
            };
        }
        this.customer_notes = datos.customer_notes;
        if (this.primary_datacenter) {
            this.primary_datacenter.asr_address = datos.primary_datacenter_asr_address;
            this.primary_datacenter.host_gateway = datos.primary_datacenter_host_gateway;
            this.primary_datacenter.host_ip = datos.primary_datacenter_host_ip;
            this.primary_datacenter.name = datos.primary_datacenter_name;
            this.primary_datacenter.v_lan = datos.primary_datacenter_v_lan;
        } else {
            (this.primary_datacenter as any) = {
                asr_address: datos.primary_datacenter_asr_address,
                host_gateway: datos.primary_datacenter_host_gateway,
                host_ip: datos.primary_datacenter_host_ip,
                name: datos.primary_datacenter_name,
                v_lan: datos.primary_datacenter_v_lan,
            };
        }
        if (this.secondary_datacenter) {
            this.secondary_datacenter.asr_address = datos.secondary_datacenter_asr_address;
            this.secondary_datacenter.host_gateway = datos.secondary_datacenter_host_gateway;
            this.secondary_datacenter.host_ip = datos.secondary_datacenter_host_ip;
            this.secondary_datacenter.name = datos.secondary_datacenter_name;
            this.secondary_datacenter.v_lan = datos.secondary_datacenter_v_lan;
        } else {
            (this.secondary_datacenter as any) = {
                asr_address: datos.secondary_datacenter_asr_address,
                host_gateway: datos.secondary_datacenter_host_gateway,
                host_ip: datos.secondary_datacenter_host_ip,
                name: datos.secondary_datacenter_name,
                v_lan: datos.secondary_datacenter_v_lan,
            };
        }
        if (this.infrastructure) {
            this.infrastructure.cluster = datos.infrastructure_cluster; 
            this.infrastructure.datacenter = datos.infrastructure_datacenter; 
            this.infrastructure.datastore = datos.infrastructure_datastore; 
        } else {
            (this.infrastructure as any) = {
                cluster: datos.infrastructure_cluster,
                datacenter: datos.infrastructure_datacenter,
                datastore: datos.infrastructure_datastore
            };
        }
        if (this.additional_network_data) {
            this.additional_network_data.nat_box_ip = datos.additional_network_data_nat_box_ip; 
            this.additional_network_data.vrf = datos.additional_network_data_vrf;
        } else {
            (this.additional_network_data as any) = {
                nat_box_ip: datos.additional_network_data_nat_box_ip,
                vrf: datos.additional_network_data_vrf
            };
        }
        if (this.mra_expressway) {
            this.mra_expressway.primary_dc_external_ip = datos.mra_expressway_primary_dc_external_ip;
            this.mra_expressway.primary_dc_internal_ip = datos.mra_expressway_primary_dc_internal_ip;
            this.mra_expressway.secondary_dc_external_ip = datos.mra_expressway_secondary_dc_external_ip;
            this.mra_expressway.secondary_dc_internal_ip = datos.mra_expressway_secondary_dc_internal_ip;
        } else {
            (this.mra_expressway as any) = {
                primary_dc_external_ip: datos.mra_expressway_primary_dc_external_ip,
                primary_dc_internal_ip: datos.mra_expressway_primary_dc_internal_ip,
                secondary_dc_external_ip: datos.mra_expressway_secondary_dc_external_ip,
                secondary_dc_internal_ip: datos.mra_expressway_secondary_dc_internal_ip
            };
        }
        if (this.additional_services) {
            this.additional_services.cuaca = datos.additional_services_cuaca;
            this.additional_services.egw = datos.additional_services_egw;
            this.additional_services.expressway = datos.additional_services_expressway;
            this.additional_services.hybrid_services = datos.additional_services_hybrid_services;
            this.additional_services.singlewire = datos.additional_services_singlewire;
        } else {
            (this.additional_services as any) = {
                cuaca: datos.additional_services_cuaca,
                egw: datos.additional_services_egw,
                expressway: datos.additional_services_expressway,
                hybrid_services: datos.additional_services_hybrid_services,
                singlewire: datos.additional_services_singlewire
            };
        }
        this.infrastructure_notes = datos.infrastructure_notes;
        if (this.dns_ntp) {
            this.dns_ntp.primary_dns = datos.dns_ntp_primary_dns;
            this.dns_ntp.secondary_dns = datos.dns_ntp_secondary_dns;
            this.dns_ntp.ntp_server_1 = datos.dns_ntp_server_1;
            this.dns_ntp.ntp_server_2 = datos.dns_ntp_server_2;
            this.dns_ntp.ntp_server_3 = datos.dns_ntp_server_3;
            this.dns_ntp.ntp_server_4 = datos.dns_ntp_server_4;
            this.dns_ntp.ntp_server_5 = datos.dns_ntp_server_5;
        } else {
            (this.dns_ntp as any) = {
                primary_dns: datos.dns_ntp_primary_dns,
                secondary_dns: datos.dns_ntp_secondary_dns,
                ntp_server_1: datos.dns_ntp_server_1,
                ntp_server_2: datos.dns_ntp_server_2,
                ntp_server_3: datos.dns_ntp_server_3,
                ntp_server_4: datos.dns_ntp_server_4,
                ntp_server_5: datos.dns_ntp_server_5
            };
        }
        if (this.host_data) {
            this.host_data.admin = datos.host_data_admin;
            this.host_data.app_user_password = datos.host_data_app_user_password;
            this.host_data.city = datos.host_data_city;
            this.host_data.continent = datos.host_data_continent;
            this.host_data.password = datos.host_data_password;
            this.host_data.security_password = datos.host_data_security_password;
            this.host_data.timezone = datos.host_data_timezone;
        }
        else {
            (this.host_data as any) = {
                admin: datos.host_data_admin,
                app_user_password: datos.host_data_app_user_password,
                city: datos.host_data_city,
                continent: datos.host_data_continent,
                password: datos.host_data_password,
                security_password: datos.host_data_security_password,
                timezone: datos.host_data_timezone
            };
        }
        if (this.certificates) {
            this.certificates.app_user_username = datos.certificates_app_user_username;
            this.certificates.auto_register_primary = datos.certificates_auto_register_primary;
            this.certificates.country = datos.certificates_country;
            this.certificates.location = datos.certificates_location;
            this.certificates.organization = datos.certificates_organization;
            this.certificates.state = datos.certificates_state;
            this.certificates.unit = datos.certificates_unit;
        } else {
            (this.certificates as any) = {
                app_user_username: datos.certificates_app_user_username,
                auto_register_primary: datos.certificates_auto_register_primary,
                country: datos.certificates_country,
                location: datos.certificates_location,
                organization: datos.certificates_organization,
                state: datos.certificates_state,
                unit: datos.certificates_unit
            };
        }
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