export const BUILDS = {
    emptyBuild: {
        id: "0",
        customer: {
            name: "",
            id_letters: "",
            id_numbers: "",
            ITC_location: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip_code: "",
            timezone: "",
            default_code_area: "",
            local_dial: "",
            extension_length: "",
            breakout_code: "",
            voice_mail_pilot: ""
        },
        domain: {
            server_domain: "",
            presence_domain: ""
        },
        active_directory: {
            timezone: "",
            default_code_area: "",
            local_dial: "",
            extension_length: "",
            breakout_code: "",
            voice_mail_pilot: ""
        },
        size: "",
        unified_messaging: {
            username: "",
            password: "",
            version: "",
            ip_address: ""
        },
        platform_test_account: {
            username: "",
            password: ""
        },
        customer_notes: "",
        primary_datacenter: {
            name: "",
            host_ip: "",
            v_lan: "",
            host_gateway: "",
            asr_address: ""
        },
        secondary_datacenter: {
            name: "",
            host_ip: "",
            v_lan: "",
            host_gateway: "",
            asr_address: ""
        },
        infrastructure: {
            datacenter: "",
            cluster: "",
            datastore: ""
        },
        additional_network_data: {
            vrf: "",
            nat_box_ip: ""
        },
        mra_expressway: {
            primary_dc_external_ip: "",
            primary_dc_internal_ip: "",
            secondary_dc_external_ip: "",
            secondary_dc_internal_ip: ""
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "",
        dns_ntp: {
            primary_dns: "",
            secondary_dns: "",
            ntp_server_1: "",
            ntp_server_2: "",
            ntp_server_3: "",
            ntp_server_4: "",
            ntp_server_5: "",
        },
        host_data: {
            timezone: "",
            continent: "",
            city: "",
            admin: "",
            password: "",
            security_password: "",
            app_user_password: ""
        },
        certificates: {
            organization: "",
            unit: "",
            location: "",
            state: "",
            country: "",
            auto_register_primary: "",
            app_user_username: ""
        },
        host_data_notes: "",
        vms: null,
        dns_records: {
            dns_to_ip: [],
            ip_to_dsn: []
        },
        platform_engineer: "",
        status: "",
        completion: "",
        elapsed_time: "",
        parameters_required: "",
        parameters_completed: ""
    },
    b1: {
        id: "CYB7PSOC-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
        customer: {
            name: "INTRADO",
            id_letters: "INT",
            id_numbers: "1234",
            ITC_location: "Denver",
            address_1: "9601 Gran St",
            address_2: "9106 Gran St",
            city: "Denver",
            state: "Colorado (CO)",
            zip_code: "80201",
            timezone: "GMT-7",
            default_code_area: "212",
            local_dial: "9",
            extension_length: "10",
            breakout_code: "51324",
            voice_mail_pilot: "1900"
        },
        domain: {
            server_domain: "intrado.com",
            presence_domain: "intrado.com"
        },
        active_directory: {
            timezone: "GTM-6",
            default_code_area: "+1",
            local_dial: "12651",
            extension_length: "256256",
            breakout_code: "15615",
            voice_mail_pilot: "156156"
        },
        size: "Medium",
        unified_messaging: {
            username: "test_user",
            password: "test_password",
            version: "1.52.2",
            ip_address: "192.226.211.14"
        },
        platform_test_account: {
            username: "pf_user",
            password: "pf_password"
        },
        customer_notes: "This is a text area to store notes when the build is being created",
        primary_datacenter: {
            name: "Denver",
            host_ip: "192.168.10.2",
            v_lan: "32",
            host_gateway: "192.168.10.1",
            asr_address: "193.168.2.3"
        },
        secondary_datacenter: {
            name: "Suwanee",
            host_ip: "192.168.20.2",
            v_lan: "32",
            host_gateway: "192.168.20.1",
            asr_address: "192.168.20.1"
        },
        infrastructure: {
            datacenter: "Denver",
            cluster: "TEMP-CLU01",
            datastore: "datastore_1"
        },
        additional_network_data: {
            vrf: "173.51.23.21",
            nat_box_ip: "173.51.23.21"
        },
        mra_expressway: {
            primary_dc_external_ip: "173.51.23.21",
            primary_dc_internal_ip: "173.51.23.22",
            secondary_dc_external_ip: "173.51.23.213",
            secondary_dc_internal_ip: "173.51.23.212"
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "This is a text area to store notes when the build is being created",
        dns_ntp: {
            primary_dns: "173.51.23.1",
            secondary_dns: "173.51.23.2",
            ntp_server_1: "ntp01-lou.vmce.westipc.com",
            ntp_server_2: "ntp02-lou.vmce.westipc.com",
            ntp_server_3: "ntp03-lou.vmce.westipc.com",
            ntp_server_4: "ntp04-lou.vmce.westipc.com",
            ntp_server_5: "ntp05-lou.vmce.westipc.com",
        },
        host_data: {
            timezone: "GTM-4",
            continent: "America",
            city: "San Francisco",
            admin: "admin_user",
            password: "password_test_host",
            security_password: "password_test_host",
            app_user_password: "password_test_host"
        },
        certificates: {
            organization: "org_certificate",
            unit: "unit_cert",
            location: "loc_certificate",
            state: "Lousiana",
            country: "EE.UU.",
            auto_register_primary: "test_primary",
            app_user_username: "username_auto_prim"
        },
        host_data_notes: "This is a text area to store notes when the build is being created",
        vms: null,
        dns_records: {
            dns_to_ip: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ],
            ip_to_dsn: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ]
        },
        platform_engineer: "Bruce Wayne",
        status: "Ready",
        completion: "0",
        elapsed_time: "-:-",
        parameters_required: "79",
        parameters_completed: "79"
    },
    b2:{
        id: "CYB7PSOC-0KAC-8Q56-JT3E-V63Y8CAKYK7B",
        customer: {
            name: "Fedex",
            id_letters: "INT",
            id_numbers: "1234",
            ITC_location: "Denver",
            address_1: "9601 Gran St",
            address_2: "9106 Gran St",
            city: "Denver",
            state: "Colorado (CO)",
            zip_code: "80201",
            timezone: "GMT-7",
            default_code_area: "212",
            local_dial: "9",
            extension_length: "10",
            breakout_code: "51324",
            voice_mail_pilot: "1900"
        },
        domain: {
            server_domain: "fedex",
            presence_domain: "suwanee"
        },
        active_directory: {
            timezone: "GTM-6",
            default_code_area: "+1",
            local_dial: "12651",
            extension_length: "256256",
            breakout_code: "15615",
            voice_mail_pilot: "156156"
        },
        size: "Medium",
        unified_messaging: {
            username: "test_user",
            password: "test_password",
            version: "1.52.2",
            ip_address: "192.226.211.14"
        },
        platform_test_account: {
            username: "pf_user",
            password: "pf_password"
        },
        customer_notes: "This is a text area to store notes when the build is being created",
        primary_datacenter: {
            name: "Denver",
            host_ip: "192.168.10.2",
            v_lan: "32",
            host_gateway: "192.168.10.1",
            asr_address: "193.168.2.3"
        },
        secondary_datacenter: {
            name: "Suwanee",
            host_ip: "192.168.20.2",
            v_lan: "32",
            host_gateway: "192.168.20.1",
            asr_address: "192.168.20.1"
        },
        infrastructure: {
            datacenter: "Denver",
            cluster: "TEMP-CLU01",
            datastore: "datastore_1"
        },
        additional_network_data: {
            vrf: "173.51.23.21",
            nat_box_ip: "173.51.23.21"
        },
        mra_expressway: {
            primary_dc_external_ip: "173.51.23.21",
            primary_dc_internal_ip: "173.51.23.22",
            secondary_dc_external_ip: "173.51.23.213",
            secondary_dc_internal_ip: "173.51.23.212"
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "This is a text area to store notes when the build is being created",
        dns_ntp: {
            primary_dns: "173.51.23.1",
            secondary_dns: "173.51.23.2",
            ntp_server_1: "ntp01-lou.vmce.westipc.com",
            ntp_server_2: "ntp02-lou.vmce.westipc.com",
            ntp_server_3: "ntp03-lou.vmce.westipc.com",
            ntp_server_4: "ntp04-lou.vmce.westipc.com",
            ntp_server_5: "ntp05-lou.vmce.westipc.com",
        },
        host_data: {
            timezone: "GTM-4",
            continent: "America",
            city: "San Francisco",
            admin: "admin_user",
            password: "password_test_host",
            security_password: "password_test_host",
            app_user_password: "password_test_host"
        },
        certificates: {
            organization: "org_certificate",
            unit: "unit_cert",
            location: "loc_certificate",
            state: "Lousiana",
            country: "EE.UU.",
            auto_register_primary: "test_primary",
            app_user_username: "username_auto_prim"
        },
        host_data_notes: "This is a text area to store notes when the build is being created",
        vms: null,
        dns_records: {
            dns_to_ip: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ],
            ip_to_dsn: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ]
        },
        platform_engineer: "Frank Castle",
        status: "Pending",
        completion: "0",
        elapsed_time: "-:-",
        parameters_required: "79",
        parameters_completed: "65"
    },
    b3: {
        id: "CYB7PSOC-0KAC-8Q56-JT3E-K7BV63Y8CAKY",
        customer: {
            name: "Sporks Company",
            id_letters: "INT",
            id_numbers: "1234",
            ITC_location: "Denver",
            address_1: "9601 Gran St",
            address_2: "9106 Gran St",
            city: "Denver",
            state: "Colorado (CO)",
            zip_code: "80201",
            timezone: "GMT-7",
            default_code_area: "212",
            local_dial: "9",
            extension_length: "10",
            breakout_code: "51324",
            voice_mail_pilot: "1900"
        },
        domain: {
            server_domain: "sporks.company",
            presence_domain: "suwanee"
        },
        active_directory: {
            timezone: "GTM-6",
            default_code_area: "+1",
            local_dial: "12651",
            extension_length: "256256",
            breakout_code: "15615",
            voice_mail_pilot: "156156"
        },
        size: "Small",
        unified_messaging: {
            username: "test_user",
            password: "test_password",
            version: "1.52.2",
            ip_address: "192.226.211.14"
        },
        platform_test_account: {
            username: "pf_user",
            password: "pf_password"
        },
        customer_notes: "This is a text area to store notes when the build is being created",
        primary_datacenter: {
            name: "Suwanee",
            host_ip: "192.168.10.2",
            v_lan: "32",
            host_gateway: "192.168.10.1",
            asr_address: "193.168.2.3"
        },
        secondary_datacenter: {
            name: "Denver",
            host_ip: "192.168.20.2",
            v_lan: "32",
            host_gateway: "192.168.20.1",
            asr_address: "192.168.20.1"
        },
        infrastructure: {
            datacenter: "Denver",
            cluster: "TEMP-CLU01",
            datastore: "datastore_1"
        },
        additional_network_data: {
            vrf: "173.51.23.21",
            nat_box_ip: "173.51.23.21"
        },
        mra_expressway: {
            primary_dc_external_ip: "173.51.23.21",
            primary_dc_internal_ip: "173.51.23.22",
            secondary_dc_external_ip: "173.51.23.213",
            secondary_dc_internal_ip: "173.51.23.212"
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "This is a text area to store notes when the build is being created",
        dns_ntp: {
            primary_dns: "173.51.23.1",
            secondary_dns: "173.51.23.2",
            ntp_server_1: "ntp01-lou.vmce.westipc.com",
            ntp_server_2: "ntp02-lou.vmce.westipc.com",
            ntp_server_3: "ntp03-lou.vmce.westipc.com",
            ntp_server_4: "ntp04-lou.vmce.westipc.com",
            ntp_server_5: "ntp05-lou.vmce.westipc.com",
        },
        host_data: {
            timezone: "GTM-4",
            continent: "America",
            city: "San Francisco",
            admin: "admin_user",
            password: "password_test_host",
            security_password: "password_test_host",
            app_user_password: "password_test_host"
        },
        certificates: {
            organization: "org_certificate",
            unit: "unit_cert",
            location: "loc_certificate",
            state: "Lousiana",
            country: "EE.UU.",
            auto_register_primary: "test_primary",
            app_user_username: "username_auto_prim"
        },
        host_data_notes: "This is a text area to store notes when the build is being created",
        vms: null,
        dns_records: {
            dns_to_ip: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ],
            ip_to_dsn: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ]
        },
        platform_engineer: "Jhon Deere",
        status: "Pending (FV)",
        completion: "0",
        elapsed_time: "-:-",
        parameters_required: "50",
        parameters_completed: "50"
    },
    b4: {
        id: "PSOCCYB7-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
        customer: {
            name: "Int CIA Morks",
            id_letters: "INT",
            id_numbers: "1234",
            ITC_location: "Denver",
            address_1: "9601 Gran St",
            address_2: "9106 Gran St",
            city: "Denver",
            state: "Colorado (CO)",
            zip_code: "80201",
            timezone: "GMT-7",
            default_code_area: "212",
            local_dial: "9",
            extension_length: "10",
            breakout_code: "51324",
            voice_mail_pilot: "1900"
        },
        domain: {
            server_domain: "int.cia.morks",
            presence_domain: "suwanee"
        },
        active_directory: {
            timezone: "GTM-6",
            default_code_area: "+1",
            local_dial: "12651",
            extension_length: "256256",
            breakout_code: "15615",
            voice_mail_pilot: "156156"
        },
        size: "Medium",
        unified_messaging: {
            username: "test_user",
            password: "test_password",
            version: "1.52.2",
            ip_address: "192.226.211.14"
        },
        platform_test_account: {
            username: "pf_user",
            password: "pf_password"
        },
        customer_notes: "This is a text area to store notes when the build is being created",
        primary_datacenter: {
            name: "Denver",
            host_ip: "192.168.10.2",
            v_lan: "32",
            host_gateway: "192.168.10.1",
            asr_address: "193.168.2.3"
        },
        secondary_datacenter: {
            name: "Suwanee",
            host_ip: "192.168.20.2",
            v_lan: "32",
            host_gateway: "192.168.20.1",
            asr_address: "192.168.20.1"
        },
        infrastructure: {
            datacenter: "Denver",
            cluster: "TEMP-CLU01",
            datastore: "datastore_1"
        },
        additional_network_data: {
            vrf: "173.51.23.21",
            nat_box_ip: "173.51.23.21"
        },
        mra_expressway: {
            primary_dc_external_ip: "173.51.23.21",
            primary_dc_internal_ip: "173.51.23.22",
            secondary_dc_external_ip: "173.51.23.213",
            secondary_dc_internal_ip: "173.51.23.212"
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "This is a text area to store notes when the build is being created",
        dns_ntp: {
            primary_dns: "173.51.23.1",
            secondary_dns: "173.51.23.2",
            ntp_server_1: "ntp01-lou.vmce.westipc.com",
            ntp_server_2: "ntp02-lou.vmce.westipc.com",
            ntp_server_3: "ntp03-lou.vmce.westipc.com",
            ntp_server_4: "ntp04-lou.vmce.westipc.com",
            ntp_server_5: "ntp05-lou.vmce.westipc.com",
        },
        host_data: {
            timezone: "GTM-4",
            continent: "America",
            city: "San Francisco",
            admin: "admin_user",
            password: "password_test_host",
            security_password: "password_test_host",
            app_user_password: "password_test_host"
        },
        certificates: {
            organization: "org_certificate",
            unit: "unit_cert",
            location: "loc_certificate",
            state: "Lousiana",
            country: "EE.UU.",
            auto_register_primary: "test_primary",
            app_user_username: "username_auto_prim"
        },
        host_data_notes: "This is a text area to store notes when the build is being created",
        vms: null,
        dns_records: {
            dns_to_ip: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ],
            ip_to_dsn: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ]
        },
        platform_engineer: "John Wick",
        status: "Canceled",
        completion: "17",
        elapsed_time: "05:15:23",
        parameters_required: "79",
        parameters_completed: "79"
    },
    b5: {
        id: "CYB7PSOC-JT3E-8Q56-JT3E-3Y8CAKYK7BV6",
        customer: {
            name: "Alchemy bars",
            id_letters: "INT",
            id_numbers: "1234",
            ITC_location: "Denver",
            address_1: "9601 Gran St",
            address_2: "9106 Gran St",
            city: "Denver",
            state: "Colorado (CO)",
            zip_code: "80201",
            timezone: "GMT-7",
            default_code_area: "212",
            local_dial: "9",
            extension_length: "10",
            breakout_code: "51324",
            voice_mail_pilot: "1900"
        },
        domain: {
            server_domain: "alchemy.bars",
            presence_domain: "suwanee"
        },
        active_directory: {
            timezone: "GTM-6",
            default_code_area: "+1",
            local_dial: "12651",
            extension_length: "256256",
            breakout_code: "15615",
            voice_mail_pilot: "156156"
        },
        size: "Large",
        unified_messaging: {
            username: "test_user",
            password: "test_password",
            version: "1.52.2",
            ip_address: "192.226.211.14"
        },
        platform_test_account: {
            username: "pf_user",
            password: "pf_password"
        },
        customer_notes: "This is a text area to store notes when the build is being created",
        primary_datacenter: {
            name: "Suwanee",
            host_ip: "192.168.10.2",
            v_lan: "32",
            host_gateway: "192.168.10.1",
            asr_address: "193.168.2.3"
        },
        secondary_datacenter: {
            name: "Denver",
            host_ip: "192.168.20.2",
            v_lan: "32",
            host_gateway: "192.168.20.1",
            asr_address: "192.168.20.1"
        },
        infrastructure: {
            datacenter: "Denver",
            cluster: "TEMP-CLU01",
            datastore: "datastore_1"
        },
        additional_network_data: {
            vrf: "173.51.23.21",
            nat_box_ip: "173.51.23.21"
        },
        mra_expressway: {
            primary_dc_external_ip: "173.51.23.21",
            primary_dc_internal_ip: "173.51.23.22",
            secondary_dc_external_ip: "173.51.23.213",
            secondary_dc_internal_ip: "173.51.23.212"
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "This is a text area to store notes when the build is being created",
        dns_ntp: {
            primary_dns: "173.51.23.1",
            secondary_dns: "173.51.23.2",
            ntp_server_1: "ntp01-lou.vmce.westipc.com",
            ntp_server_2: "ntp02-lou.vmce.westipc.com",
            ntp_server_3: "ntp03-lou.vmce.westipc.com",
            ntp_server_4: "ntp04-lou.vmce.westipc.com",
            ntp_server_5: "ntp05-lou.vmce.westipc.com",
        },
        host_data: {
            timezone: "GTM-4",
            continent: "America",
            city: "San Francisco",
            admin: "admin_user",
            password: "password_test_host",
            security_password: "password_test_host",
            app_user_password: "password_test_host"
        },
        certificates: {
            organization: "org_certificate",
            unit: "unit_cert",
            location: "loc_certificate",
            state: "Lousiana",
            country: "EE.UU.",
            auto_register_primary: "test_primary",
            app_user_username: "username_auto_prim"
        },
        host_data_notes: "This is a text area to store notes when the build is being created",
        vms: null,
        dns_records: {
            dns_to_ip: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ],
            ip_to_dsn: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ]
        },
        platform_engineer: "Scott Jhonson",
        status: "Failed",
        completion: "83",
        elapsed_time: "10:13:55",
        parameters_required: "100",
        parameters_completed: "100"
    },
    b6: {
        id: "CYB7PSOC-0KAC-8Q56-8Q56-3Y8CAKYK7BV6",
        customer: {
            name: "Cust Mors Treps",
            id_letters: "INT",
            id_numbers: "1234",
            ITC_location: "Denver",
            address_1: "9601 Gran St",
            address_2: "9106 Gran St",
            city: "Denver",
            state: "Colorado (CO)",
            zip_code: "80201",
            timezone: "GMT-7",
            default_code_area: "212",
            local_dial: "9",
            extension_length: "10",
            breakout_code: "51324",
            voice_mail_pilot: "1900"
        },
        domain: {
            server_domain: "cust.mors.treps",
            presence_domain: "suwanee"
        },
        active_directory: {
            timezone: "GTM-6",
            default_code_area: "+1",
            local_dial: "12651",
            extension_length: "256256",
            breakout_code: "15615",
            voice_mail_pilot: "156156"
        },
        size: "Medium",
        unified_messaging: {
            username: "test_user",
            password: "test_password",
            version: "1.52.2",
            ip_address: "192.226.211.14"
        },
        platform_test_account: {
            username: "pf_user",
            password: "pf_password"
        },
        customer_notes: "This is a text area to store notes when the build is being created",
        primary_datacenter: {
            name: "Denver",
            host_ip: "192.168.10.2",
            v_lan: "32",
            host_gateway: "192.168.10.1",
            asr_address: "193.168.2.3"
        },
        secondary_datacenter: {
            name: "Suwanee",
            host_ip: "192.168.20.2",
            v_lan: "32",
            host_gateway: "192.168.20.1",
            asr_address: "192.168.20.1"
        },
        infrastructure: {
            datacenter: "Denver",
            cluster: "TEMP-CLU01",
            datastore: "datastore_1"
        },
        additional_network_data: {
            vrf: "173.51.23.21",
            nat_box_ip: "173.51.23.21"
        },
        mra_expressway: {
            primary_dc_external_ip: "173.51.23.21",
            primary_dc_internal_ip: "173.51.23.22",
            secondary_dc_external_ip: "173.51.23.213",
            secondary_dc_internal_ip: "173.51.23.212"
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "This is a text area to store notes when the build is being created",
        dns_ntp: {
            primary_dns: "173.51.23.1",
            secondary_dns: "173.51.23.2",
            ntp_server_1: "ntp01-lou.vmce.westipc.com",
            ntp_server_2: "ntp02-lou.vmce.westipc.com",
            ntp_server_3: "ntp03-lou.vmce.westipc.com",
            ntp_server_4: "ntp04-lou.vmce.westipc.com",
            ntp_server_5: "ntp05-lou.vmce.westipc.com",
        },
        host_data: {
            timezone: "GTM-4",
            continent: "America",
            city: "San Francisco",
            admin: "admin_user",
            password: "password_test_host",
            security_password: "password_test_host",
            app_user_password: "password_test_host"
        },
        certificates: {
            organization: "org_certificate",
            unit: "unit_cert",
            location: "loc_certificate",
            state: "Lousiana",
            country: "EE.UU.",
            auto_register_primary: "test_primary",
            app_user_username: "username_auto_prim"
        },
        host_data_notes: "This is a text area to store notes when the build is being created",
        vms: null,
        dns_records: {
            dns_to_ip: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ],
            ip_to_dsn: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ]
        },
        platform_engineer: "Steve Hallen",
        status: "Running",
        completion: "23",
        elapsed_time: "02:15:37",
        parameters_required: "79",
        parameters_completed: "79"
    },
    b7: {
        id: "CYB7PSOC-8Q56-8Q56-JT3E-3Y8CAKYK7BV6",
        customer: {
            name: "Customer Customs",
            id_letters: "INT",
            id_numbers: "1234",
            ITC_location: "Denver",
            address_1: "9601 Gran St",
            address_2: "9106 Gran St",
            city: "Denver",
            state: "Colorado (CO)",
            zip_code: "80201",
            timezone: "GMT-7",
            default_code_area: "212",
            local_dial: "9",
            extension_length: "10",
            breakout_code: "51324",
            voice_mail_pilot: "1900"
        },
        domain: {
            server_domain: "customer.customs",
            presence_domain: "suwanee"
        },
        active_directory: {
            timezone: "GTM-6",
            default_code_area: "+1",
            local_dial: "12651",
            extension_length: "256256",
            breakout_code: "15615",
            voice_mail_pilot: "156156"
        },
        size: "Medium",
        unified_messaging: {
            username: "test_user",
            password: "test_password",
            version: "1.52.2",
            ip_address: "192.226.211.14"
        },
        platform_test_account: {
            username: "pf_user",
            password: "pf_password"
        },
        customer_notes: "This is a text area to store notes when the build is being created",
        primary_datacenter: {
            name: "Denver",
            host_ip: "192.168.10.2",
            v_lan: "32",
            host_gateway: "192.168.10.1",
            asr_address: "193.168.2.3"
        },
        secondary_datacenter: {
            name: "Suwanee",
            host_ip: "192.168.20.2",
            v_lan: "32",
            host_gateway: "192.168.20.1",
            asr_address: "192.168.20.1"
        },
        infrastructure: {
            datacenter: "Denver",
            cluster: "TEMP-CLU01",
            datastore: "datastore_1"
        },
        additional_network_data: {
            vrf: "173.51.23.21",
            nat_box_ip: "173.51.23.21"
        },
        mra_expressway: {
            primary_dc_external_ip: "173.51.23.21",
            primary_dc_internal_ip: "173.51.23.22",
            secondary_dc_external_ip: "173.51.23.213",
            secondary_dc_internal_ip: "173.51.23.212"
        },
        additional_services: {
            expressway: true,
            singlewire: false,
            cuaca: false,
            egw: false,
            hybrid_services: false
        },
        infrastructure_notes: "This is a text area to store notes when the build is being created",
        dns_ntp: {
            primary_dns: "173.51.23.1",
            secondary_dns: "173.51.23.2",
            ntp_server_1: "ntp01-lou.vmce.westipc.com",
            ntp_server_2: "ntp02-lou.vmce.westipc.com",
            ntp_server_3: "ntp03-lou.vmce.westipc.com",
            ntp_server_4: "ntp04-lou.vmce.westipc.com",
            ntp_server_5: "ntp05-lou.vmce.westipc.com",
        },
        host_data: {
            timezone: "GTM-4",
            continent: "America",
            city: "San Francisco",
            admin: "admin_user",
            password: "password_test_host",
            security_password: "password_test_host",
            app_user_password: "password_test_host"
        },
        certificates: {
            organization: "org_certificate",
            unit: "unit_cert",
            location: "loc_certificate",
            state: "Lousiana",
            country: "EE.UU.",
            auto_register_primary: "test_primary",
            app_user_username: "username_auto_prim"
        },
        host_data_notes: "This is a text area to store notes when the build is being created",
        vms: null,
        dns_records: {
            dns_to_ip: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ],
            ip_to_dsn: [
                {
                    dns: "CCM1P01DEN.VMCE",
                    ip: "192.168.10.6"
                },
                {
                    dns: "CCM1S01DEN.VMCE",
                    ip: "192.168.10.7"
                },
                {
                    dns: "CCM1S01SWN.VMCE",
                    ip: "192.168.20.7"
                },
                {
                    dns: "IMP1S01DEN.VMCE",
                    ip: "192.168.10.8"
                },
                {
                    dns: "IMP1S01SWN.VMCE",
                    ip: "192.168.20.8"
                },
                {
                    dns: "CUC1P01DEN.VMCE",
                    ip: "192.168.10.9"
                },
                {
                    dns: "CUC1S01SWN.VMCE",
                    ip: "192.168.20.9"
                },
                {
                    dns: "EXP1S01DEN.VMCE",
                    ip: "192.168.10.10"
                },
                {
                    dns: "EXP1S01SWN.VMCE",
                    ip: "192.168.20.10"
                }
            ]
        },
        platform_engineer: "Mills Begant",
        status: "Completed",
        completion: "100",
        elapsed_time: "12:17:53",
        parameters_required: "79",
        parameters_completed: "79"
    }
};