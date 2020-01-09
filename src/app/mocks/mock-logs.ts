export const LOGS = {
    log1: {
        "build_id": "CYB7PSOC-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
        "validationLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T16:04:40"),
                "title": "Checking customer information details",
                "type": "Validation Log",
                "details": "Validating the customer information is consistent and there is no incompatible data",
                "module": "Customer Information",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T16:07:42"),
                "title": "Checking infrastructure data",
                "type": "Validation Log",
                "details": "Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
                "module": "Infrastructure",
                "status": "Sucess"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T16:10:42"),
                "title": "Cheking host data information",
                "type": "Validation Log",
                "details": "Checking the host data information matches with the current network",
                "module": "Host Data",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T16:15:42"),
                "title": "Checking generated VM model",
                "type": "Validation Log",
                "details": "Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
                "module": "VM's model",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T16:25:42"),
                "title": "Checking DNS Records information",
                "type": "Validation Log",
                "details": "Checking the whole DNS records table infromation have been generated properly",
                "module": "DNS Records",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T16:32:42"),
                "title": "Checking ASR/SONUS data",
                "type": "Validation Log",
                "details": "Validating consistency between configuration and ASR/SONUS avaiable information",
                "module": "ASR/SONUS",
                "status": "Success"
            }
        ],
        "executionLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T18:00:42"),
                "title": "Checking disk availability",
                "type": "Execution Log",
                "details": "Validating that there's enough available disk space to hold the VMs that are going to be cloned",
                "module": "Disk availability",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T18:15:52"),
                "title": "Creating folders",
                "type": "Execution Log",
                "details": "Creating all folders needed to hold the new VM's after they are cloned",
                "module": "Folders",
                "status": "Success"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T18:37:09"),
                "title": "Creating Resource Pool",
                "type": "Execution Log",
                "details": "Creating the necessary resource pool to manage all the VM's to be created",
                "module": "Resource Pool",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T19:45:08"),
                "title": "Creating Answer files",
                "type": "Execution Log",
                "details": "Creating answer files taking the information put in the configuration for each MV",
                "module": "Answer files",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T20:08:17"),
                "title": "Creating Floppy disk",
                "type": "Execution Log",
                "details": "Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
                "module": "Floppy",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T20:35:32"),
                "title": "Configuring Network",
                "type": "Execution Log",
                "details": "Configuring switches and network access",
                "module": "Network configuration",
                "status": "Success"
            },
            {
                "id": "7",
                "date": new Date("2019-12-31T21:15:20"),
                "title": "Cloning VM's",
                "type": "Execution Log",
                "details": "Clonning all the VM's within the model",
                "module": "Clone VM",
                "status": "Success"
            },
            {
                "id": "8",
                "date": new Date("2019-12-31T21:40:42"),
                "title": "Configuring VM's",
                "type": "Execution Log",
                "details": "Configuring each VM taking into account the model created",
                "module": "VM configuration",
                "status": "Running"
            }
        ]
    },
    log2: {
        "build_id": "CYB7PSOC-0KAC-8Q56-JT3E-V63Y8CAKYK7B",
        "validationLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T16:04:40"),
                "title": "Checking customer information details",
                "type": "Validation Log",
                "details": "Validating the customer information is consistent and there is no incompatible data",
                "module": "Customer Information",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T16:07:42"),
                "title": "Checking infrastructure data",
                "type": "Validation Log",
                "details": "Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
                "module": "Infrastructure",
                "status": "Sucess"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T16:10:42"),
                "title": "Cheking host data information",
                "type": "Validation Log",
                "details": "Checking the host data information matches with the current network",
                "module": "Host Data",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T16:15:42"),
                "title": "Checking generated VM model",
                "type": "Validation Log",
                "details": "Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
                "module": "VM's model",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T16:25:42"),
                "title": "Checking DNS Records information",
                "type": "Validation Log",
                "details": "Checking the whole DNS records table infromation have been generated properly",
                "module": "DNS Records",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T16:32:42"),
                "title": "Checking ASR/SONUS data",
                "type": "Validation Log",
                "details": "Validating consistency between configuration and ASR/SONUS avaiable information",
                "module": "ASR/SONUS",
                "status": "Success"
            }
        ],
        "executionLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T18:00:42"),
                "title": "Checking disk availability",
                "type": "Execution Log",
                "details": "Validating that there's enough available disk space to hold the VMs that are going to be cloned",
                "module": "Disk availability",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T18:15:52"),
                "title": "Creating folders",
                "type": "Execution Log",
                "details": "Creating all folders needed to hold the new VM's after they are cloned",
                "module": "Folders",
                "status": "Success"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T18:37:09"),
                "title": "Creating Resource Pool",
                "type": "Execution Log",
                "details": "Creating the necessary resource pool to manage all the VM's to be created",
                "module": "Resource Pool",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T19:45:08"),
                "title": "Creating Answer files",
                "type": "Execution Log",
                "details": "Creating answer files taking the information put in the configuration for each MV",
                "module": "Answer files",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T20:08:17"),
                "title": "Creating Floppy disk",
                "type": "Execution Log",
                "details": "Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
                "module": "Floppy",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T20:35:32"),
                "title": "Configuring Network",
                "type": "Execution Log",
                "details": "Configuring switches and network access",
                "module": "Network configuration",
                "status": "Success"
            },
            {
                "id": "7",
                "date": new Date("2019-12-31T21:15:20"),
                "title": "Cloning VM's",
                "type": "Execution Log",
                "details": "Clonning all the VM's within the model",
                "module": "Clone VM",
                "status": "Success"
            },
            {
                "id": "8",
                "date": new Date("2019-12-31T21:40:42"),
                "title": "Configuring VM's",
                "type": "Execution Log",
                "details": "Configuring each VM taking into account the model created",
                "module": "VM configuration",
                "status": "Running"
            }
        ]
    },
    log3: {
        "build_id": "CYB7PSOC-0KAC-8Q56-JT3E-K7BV63Y8CAKY",
        "validationLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T16:04:40"),
                "title": "Checking customer information details",
                "type": "Validation Log",
                "details": "Validating the customer information is consistent and there is no incompatible data",
                "module": "Customer Information",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T16:07:42"),
                "title": "Checking infrastructure data",
                "type": "Validation Log",
                "details": "Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
                "module": "Infrastructure",
                "status": "Sucess"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T16:10:42"),
                "title": "Cheking host data information",
                "type": "Validation Log",
                "details": "Checking the host data information matches with the current network",
                "module": "Host Data",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T16:15:42"),
                "title": "Checking generated VM model",
                "type": "Validation Log",
                "details": "Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
                "module": "VM's model",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T16:25:42"),
                "title": "Checking DNS Records information",
                "type": "Validation Log",
                "details": "Checking the whole DNS records table infromation have been generated properly",
                "module": "DNS Records",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T16:32:42"),
                "title": "Checking ASR/SONUS data",
                "type": "Validation Log",
                "details": "Validating consistency between configuration and ASR/SONUS avaiable information",
                "module": "ASR/SONUS",
                "status": "Success"
            }
        ],
        "executionLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T18:00:42"),
                "title": "Checking disk availability",
                "type": "Execution Log",
                "details": "Validating that there's enough available disk space to hold the VMs that are going to be cloned",
                "module": "Disk availability",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T18:15:52"),
                "title": "Creating folders",
                "type": "Execution Log",
                "details": "Creating all folders needed to hold the new VM's after they are cloned",
                "module": "Folders",
                "status": "Success"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T18:37:09"),
                "title": "Creating Resource Pool",
                "type": "Execution Log",
                "details": "Creating the necessary resource pool to manage all the VM's to be created",
                "module": "Resource Pool",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T19:45:08"),
                "title": "Creating Answer files",
                "type": "Execution Log",
                "details": "Creating answer files taking the information put in the configuration for each MV",
                "module": "Answer files",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T20:08:17"),
                "title": "Creating Floppy disk",
                "type": "Execution Log",
                "details": "Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
                "module": "Floppy",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T20:35:32"),
                "title": "Configuring Network",
                "type": "Execution Log",
                "details": "Configuring switches and network access",
                "module": "Network configuration",
                "status": "Success"
            },
            {
                "id": "7",
                "date": new Date("2019-12-31T21:15:20"),
                "title": "Cloning VM's",
                "type": "Execution Log",
                "details": "Clonning all the VM's within the model",
                "module": "Clone VM",
                "status": "Success"
            },
            {
                "id": "8",
                "date": new Date("2019-12-31T21:40:42"),
                "title": "Configuring VM's",
                "type": "Execution Log",
                "details": "Configuring each VM taking into account the model created",
                "module": "VM configuration",
                "status": "Running"
            }
        ]
    },
    log4: {
        "build_id": "PSOCCYB7-0KAC-8Q56-JT3E-3Y8CAKYK7BV6",
        "validationLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T16:04:40"),
                "title": "Checking customer information details",
                "type": "Validation Log",
                "details": "Validating the customer information is consistent and there is no incompatible data",
                "module": "Customer Information",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T16:07:42"),
                "title": "Checking infrastructure data",
                "type": "Validation Log",
                "details": "Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
                "module": "Infrastructure",
                "status": "Sucess"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T16:10:42"),
                "title": "Cheking host data information",
                "type": "Validation Log",
                "details": "Checking the host data information matches with the current network",
                "module": "Host Data",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T16:15:42"),
                "title": "Checking generated VM model",
                "type": "Validation Log",
                "details": "Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
                "module": "VM's model",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T16:25:42"),
                "title": "Checking DNS Records information",
                "type": "Validation Log",
                "details": "Checking the whole DNS records table infromation have been generated properly",
                "module": "DNS Records",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T16:32:42"),
                "title": "Checking ASR/SONUS data",
                "type": "Validation Log",
                "details": "Validating consistency between configuration and ASR/SONUS avaiable information",
                "module": "ASR/SONUS",
                "status": "Success"
            }
        ],
        "executionLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T18:00:42"),
                "title": "Checking disk availability",
                "type": "Execution Log",
                "details": "Validating that there's enough available disk space to hold the VMs that are going to be cloned",
                "module": "Disk availability",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T18:15:52"),
                "title": "Creating folders",
                "type": "Execution Log",
                "details": "Creating all folders needed to hold the new VM's after they are cloned",
                "module": "Folders",
                "status": "Success"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T18:37:09"),
                "title": "Creating Resource Pool",
                "type": "Execution Log",
                "details": "Creating the necessary resource pool to manage all the VM's to be created",
                "module": "Resource Pool",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T19:45:08"),
                "title": "Creating Answer files",
                "type": "Execution Log",
                "details": "Creating answer files taking the information put in the configuration for each MV",
                "module": "Answer files",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T20:08:17"),
                "title": "Creating Floppy disk",
                "type": "Execution Log",
                "details": "Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
                "module": "Floppy",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T20:35:32"),
                "title": "Configuring Network",
                "type": "Execution Log",
                "details": "Configuring switches and network access",
                "module": "Network configuration",
                "status": "Success"
            },
            {
                "id": "7",
                "date": new Date("2019-12-31T21:15:20"),
                "title": "Cloning VM's",
                "type": "Execution Log",
                "details": "Clonning all the VM's within the model",
                "module": "Clone VM",
                "status": "Success"
            },
            {
                "id": "8",
                "date": new Date("2019-12-31T21:40:42"),
                "title": "Configuring VM's",
                "type": "Execution Log",
                "details": "Configuring each VM taking into account the model created",
                "module": "VM configuration",
                "status": "Running"
            }
        ]
    },
    log5: {
        "build_id": "CYB7PSOC-JT3E-8Q56-JT3E-3Y8CAKYK7BV6",
        "validationLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T16:04:40"),
                "title": "Checking customer information details",
                "type": "Validation Log",
                "details": "Validating the customer information is consistent and there is no incompatible data",
                "module": "Customer Information",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T16:07:42"),
                "title": "Checking infrastructure data",
                "type": "Validation Log",
                "details": "Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
                "module": "Infrastructure",
                "status": "Sucess"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T16:10:42"),
                "title": "Cheking host data information",
                "type": "Validation Log",
                "details": "Checking the host data information matches with the current network",
                "module": "Host Data",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T16:15:42"),
                "title": "Checking generated VM model",
                "type": "Validation Log",
                "details": "Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
                "module": "VM's model",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T16:25:42"),
                "title": "Checking DNS Records information",
                "type": "Validation Log",
                "details": "Checking the whole DNS records table infromation have been generated properly",
                "module": "DNS Records",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T16:32:42"),
                "title": "Checking ASR/SONUS data",
                "type": "Validation Log",
                "details": "Validating consistency between configuration and ASR/SONUS avaiable information",
                "module": "ASR/SONUS",
                "status": "Success"
            }
        ],
        "executionLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T18:00:42"),
                "title": "Checking disk availability",
                "type": "Execution Log",
                "details": "Validating that there's enough available disk space to hold the VMs that are going to be cloned",
                "module": "Disk availability",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T18:15:52"),
                "title": "Creating folders",
                "type": "Execution Log",
                "details": "Creating all folders needed to hold the new VM's after they are cloned",
                "module": "Folders",
                "status": "Success"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T18:37:09"),
                "title": "Creating Resource Pool",
                "type": "Execution Log",
                "details": "Creating the necessary resource pool to manage all the VM's to be created",
                "module": "Resource Pool",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T19:45:08"),
                "title": "Creating Answer files",
                "type": "Execution Log",
                "details": "Creating answer files taking the information put in the configuration for each MV",
                "module": "Answer files",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T20:08:17"),
                "title": "Creating Floppy disk",
                "type": "Execution Log",
                "details": "Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
                "module": "Floppy",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T20:35:32"),
                "title": "Configuring Network",
                "type": "Execution Log",
                "details": "Configuring switches and network access",
                "module": "Network configuration",
                "status": "Success"
            },
            {
                "id": "7",
                "date": new Date("2019-12-31T21:15:20"),
                "title": "Cloning VM's",
                "type": "Execution Log",
                "details": "Clonning all the VM's within the model",
                "module": "Clone VM",
                "status": "Success"
            },
            {
                "id": "8",
                "date": new Date("2019-12-31T21:40:42"),
                "title": "Configuring VM's",
                "type": "Execution Log",
                "details": "Configuring each VM taking into account the model created",
                "module": "VM configuration",
                "status": "Running"
            }
        ]
    },
    log6: {
        "build_id": "CYB7PSOC-0KAC-8Q56-8Q56-3Y8CAKYK7BV6",
        "validationLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T16:04:40"),
                "title": "Checking customer information details",
                "type": "Validation Log",
                "details": "Validating the customer information is consistent and there is no incompatible data",
                "module": "Customer Information",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T16:07:42"),
                "title": "Checking infrastructure data",
                "type": "Validation Log",
                "details": "Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
                "module": "Infrastructure",
                "status": "Sucess"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T16:10:42"),
                "title": "Cheking host data information",
                "type": "Validation Log",
                "details": "Checking the host data information matches with the current network",
                "module": "Host Data",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T16:15:42"),
                "title": "Checking generated VM model",
                "type": "Validation Log",
                "details": "Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
                "module": "VM's model",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T16:25:42"),
                "title": "Checking DNS Records information",
                "type": "Validation Log",
                "details": "Checking the whole DNS records table infromation have been generated properly",
                "module": "DNS Records",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T16:32:42"),
                "title": "Checking ASR/SONUS data",
                "type": "Validation Log",
                "details": "Validating consistency between configuration and ASR/SONUS avaiable information",
                "module": "ASR/SONUS",
                "status": "Success"
            }
        ],
        "executionLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T18:00:42"),
                "title": "Checking disk availability",
                "type": "Execution Log",
                "details": "Validating that there's enough available disk space to hold the VMs that are going to be cloned",
                "module": "Disk availability",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T18:15:52"),
                "title": "Creating folders",
                "type": "Execution Log",
                "details": "Creating all folders needed to hold the new VM's after they are cloned",
                "module": "Folders",
                "status": "Success"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T18:37:09"),
                "title": "Creating Resource Pool",
                "type": "Execution Log",
                "details": "Creating the necessary resource pool to manage all the VM's to be created",
                "module": "Resource Pool",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T19:45:08"),
                "title": "Creating Answer files",
                "type": "Execution Log",
                "details": "Creating answer files taking the information put in the configuration for each MV",
                "module": "Answer files",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T20:08:17"),
                "title": "Creating Floppy disk",
                "type": "Execution Log",
                "details": "Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
                "module": "Floppy",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T20:35:32"),
                "title": "Configuring Network",
                "type": "Execution Log",
                "details": "Configuring switches and network access",
                "module": "Network configuration",
                "status": "Success"
            },
            {
                "id": "7",
                "date": new Date("2019-12-31T21:15:20"),
                "title": "Cloning VM's",
                "type": "Execution Log",
                "details": "Clonning all the VM's within the model",
                "module": "Clone VM",
                "status": "Success"
            },
            {
                "id": "8",
                "date": new Date("2019-12-31T21:40:42"),
                "title": "Configuring VM's",
                "type": "Execution Log",
                "details": "Configuring each VM taking into account the model created",
                "module": "VM configuration",
                "status": "Running"
            }
        ]
    },
    log7: {
        "build_id": "CYB7PSOC-8Q56-8Q56-JT3E-3Y8CAKYK7BV6",
        "validationLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T16:04:40"),
                "title": "Checking customer information details",
                "type": "Validation Log",
                "details": "Validating the customer information is consistent and there is no incompatible data",
                "module": "Customer Information",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T16:07:42"),
                "title": "Checking infrastructure data",
                "type": "Validation Log",
                "details": "Checking the infrastructure data put in the configuration is available within the servers and datacenter's and it's compatible with the expected model",
                "module": "Infrastructure",
                "status": "Sucess"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T16:10:42"),
                "title": "Cheking host data information",
                "type": "Validation Log",
                "details": "Checking the host data information matches with the current network",
                "module": "Host Data",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T16:15:42"),
                "title": "Checking generated VM model",
                "type": "Validation Log",
                "details": "Validating the model generated from the configuration and the specifications selected it's a valid and consistent model with the current network and hardware",
                "module": "VM's model",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T16:25:42"),
                "title": "Checking DNS Records information",
                "type": "Validation Log",
                "details": "Checking the whole DNS records table infromation have been generated properly",
                "module": "DNS Records",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T16:32:42"),
                "title": "Checking ASR/SONUS data",
                "type": "Validation Log",
                "details": "Validating consistency between configuration and ASR/SONUS avaiable information",
                "module": "ASR/SONUS",
                "status": "Success"
            }
        ],
        "executionLogs": [
            {
                "id": "1",
                "date": new Date("2019-12-31T18:00:42"),
                "title": "Checking disk availability",
                "type": "Execution Log",
                "details": "Validating that there's enough available disk space to hold the VMs that are going to be cloned",
                "module": "Disk availability",
                "status": "Success"
            },
            {
                "id": "2",
                "date": new Date("2019-12-31T18:15:52"),
                "title": "Creating folders",
                "type": "Execution Log",
                "details": "Creating all folders needed to hold the new VM's after they are cloned",
                "module": "Folders",
                "status": "Success"
            },
            {
                "id": "3",
                "date": new Date("2019-12-31T18:37:09"),
                "title": "Creating Resource Pool",
                "type": "Execution Log",
                "details": "Creating the necessary resource pool to manage all the VM's to be created",
                "module": "Resource Pool",
                "status": "Success"
            },
            {
                "id": "4",
                "date": new Date("2019-12-31T19:45:08"),
                "title": "Creating Answer files",
                "type": "Execution Log",
                "details": "Creating answer files taking the information put in the configuration for each MV",
                "module": "Answer files",
                "status": "Success"
            },
            {
                "id": "5",
                "date": new Date("2019-12-31T20:08:17"),
                "title": "Creating Floppy disk",
                "type": "Execution Log",
                "details": "Creating all the floppy disk necessary to hold the answer files in order to configure each VM",
                "module": "Floppy",
                "status": "Success"
            },
            {
                "id": "6",
                "date": new Date("2019-12-31T20:35:32"),
                "title": "Configuring Network",
                "type": "Execution Log",
                "details": "Configuring switches and network access",
                "module": "Network configuration",
                "status": "Success"
            },
            {
                "id": "7",
                "date": new Date("2019-12-31T21:15:20"),
                "title": "Cloning VM's",
                "type": "Execution Log",
                "details": "Clonning all the VM's within the model",
                "module": "Clone VM",
                "status": "Success"
            },
            {
                "id": "8",
                "date": new Date("2019-12-31T21:40:42"),
                "title": "Configuring VM's",
                "type": "Execution Log",
                "details": "Configuring each VM taking into account the model created",
                "module": "VM configuration",
                "status": "Running"
            }
        ]
    }
}