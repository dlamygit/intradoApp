import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { adminPassword, alphabetic, numeric, username, certificate, ipFormat, userPassword, hostName } from 'src/app/validators/regex.validator';
import { Build } from 'src/app/Model/Build';
import { BUILD_CONSTANTS } from 'src/app/constants/build-constants';
import { VirtualMachineModelMedium } from 'src/app/Model/VirtualMachineModelMedium';
import { ERROR_CONSTANTS } from 'src/app/constants/errors-constatns';

@Injectable()
export class BuildConfigFormService {
	public form: FormGroup;

	constructor(
		private fb: FormBuilder
	) {
		this.form = this.fb.group({
			customer_name: null,
			customer_id_letters: [null, alphabetic],
			customer_id_numbers: [null, numeric],
			customer_ITC_location: null,
			customer_address_1: null,
			customer_address_2: null,
			customer_city: null,
			customer_state: null,
			customer_zip_code: null,
			customer_timezone: null,
			customer_default_code_area: null,
			customer_local_dial: null,
			customer_extension_length: [null, numeric],
			customer_breakout_code: null,
			customer_voice_mail_pilot: null,
			server_domain: null,
			presence_domain: null,
			size: null,
			unified_messaging_username: null,
			unified_messaging_password: null,
			platform_test_account_username: null,
			platform_test_account_password: null,
			customer_notes: null,
			primary_datacenter_name: null,
			primary_datacenter_host_ip: [null, ipFormat],
			primary_datacenter_v_lan: null,
			primary_datacenter_host_gateway: [null, ipFormat],
			primary_datacenter_asr_address: [null, ipFormat],
			secondary_datacenter_name: null,
			secondary_datacenter_host_ip: [null, ipFormat],
			secondary_datacenter_v_lan: null,
			secondary_datacenter_host_gateway: [null, ipFormat],
			secondary_datacenter_asr_address: [null, ipFormat],
			infrastructure_datacenter: null,
			infrastructure_cluster: null,
			infrastructure_datastore: null,
			additional_network_data_vrf: [null, ipFormat],
			additional_network_data_nat_box_ip: [null, ipFormat],
			mra_expressway_primary_dc_external_ip: [null, ipFormat],
			mra_expressway_primary_dc_internal_ip: [null, ipFormat],
			mra_expressway_secondary_dc_external_ip: [null, ipFormat],
			mra_expressway_secondary_dc_internal_ip: [null, ipFormat],
			additional_services_expressway: null,
			additional_services_singlewire: null,
			additional_services_cuaca: null,
			additional_services_egw: null,
			additional_services_hybrid_services: null,
			infrastructure_notes: null,
			dns_ntp_primary_dns: [null, ipFormat],
			dns_ntp_secondary_dns: [null, ipFormat],
			dns_ntp_server_1: [null, ipFormat],
			dns_ntp_server_2: [null, ipFormat],
			dns_ntp_server_3: [null, ipFormat],
			dns_ntp_server_4: [null, ipFormat],
			dns_ntp_server_5: [null, ipFormat],
			host_data_timezone: null,
			host_data_continent: null,
			host_data_city: null,
			host_data_admin: null,
			host_data_password: [null, adminPassword],
			host_data_security_password: [null, adminPassword],
			host_data_app_user_password: [null, userPassword],
			certificates_organization: [null, certificate],
			certificates_unit: [null, certificate],
			certificates_location: [null, certificate],
			certificates_state: [null, certificate],
			certificates_country: null,
			certificates_auto_register_primary: null,
			certificates_app_user_username: [null, username],
			host_data_notes: null,
		}); //TODO Validators
	}

	calculateData(build: Build): Build {
		const buildSize = build.size;
		switch (buildSize) {
			case BUILD_CONSTANTS.SMALL_SIZE:
				break;
			case BUILD_CONSTANTS.MEDIUM_SIZE:
				build.vms = this.calculateVMsMedium(build);
				break;
			case BUILD_CONSTANTS.LARGE_SIZE:
				break;
			case BUILD_CONSTANTS.EXTRA_LARGE_SIZE:
				break;
		}
		return build;
	}

	private calculateVMsMedium(build: Build): VirtualMachineModelMedium {
		const vmm = build.vms != null ? build.vms as VirtualMachineModelMedium : new VirtualMachineModelMedium();

		//calculate vm names
		vmm.cmPrimaryPublisher.host_name = vmm.cmPrimaryPublisher.vm_name = build.customer.id_letters + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First;
		vmm.cmPrimarySubscriber.host_name = vmm.cmPrimarySubscriber.vm_name = build.customer.id_letters + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First;
		vmm.cmSecondarySubscriber.host_name = vmm.cmSecondarySubscriber.vm_name = build.customer.id_letters + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second;
		vmm.impPrimarySubscriber.host_name = vmm.impPrimarySubscriber.vm_name = build.customer.id_letters + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First;
		vmm.impSecondarySubscriber.host_name = vmm.impSecondarySubscriber.vm_name = build.customer.id_letters + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second;
		vmm.cucxPrimarySubscriber.host_name = vmm.cucxPrimarySubscriber.vm_name = build.customer.id_letters + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First;
		vmm.cucxSecondaryPublisher.host_name = vmm.cucxSecondaryPublisher.vm_name = build.customer.id_letters + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].First;
		// vmm.expePrimaryPublisher.vm_name = "";
		// vmm.expcPrimarySubscriber.vm_name = "";
		// vmm.expeSecondaryPublisher.vm_name = "";
		// vmm.expcSecondarySubscriber.vm_name = "";

		//calculate vms host ips
		let primaryHostIdArray = build.primary_datacenter.host_ip.split(".");
		let secondaryHostIdArray = build.secondary_datacenter.host_ip.split(".");

		build.dns_records.dns_to_ip = [];
		build.dns_records.ip_to_dns = [];
		if (primaryHostIdArray.length === 4 && primaryHostIdArray[primaryHostIdArray.length - 1] !== '') {
			let lastPortionPrimaryHostId = (parseInt(primaryHostIdArray[primaryHostIdArray.length - 1]));
			let firstPortionPrimaryHostId = primaryHostIdArray.slice(0, 3).join(".");

			vmm.cmPrimaryPublisher.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 5).toString();
			vmm.cmPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 6).toString();
			vmm.cucxPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 7).toString();
			vmm.impPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 8).toString();
			// vmm.expcPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 9).toString();
			// vmm.expePrimaryPublisher.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 10).toString();

			// calculate dns records data			 
			build.dns_records.dns_to_ip.push({ dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cmPrimaryPublisher.host_ip });
			build.dns_records.dns_to_ip.push({ dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cmPrimarySubscriber.host_ip });
			build.dns_records.dns_to_ip.push({ dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cucxPrimarySubscriber.host_ip });
			build.dns_records.dns_to_ip.push({ dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.impPrimarySubscriber.host_ip });

			build.dns_records.ip_to_dns.push({ dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 5).toString() });
			build.dns_records.ip_to_dns.push({ dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 6).toString() });
			build.dns_records.ip_to_dns.push({ dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 7).toString() });
			build.dns_records.ip_to_dns.push({ dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 8).toString() });
		} else {
			vmm.cmPrimaryPublisher.host_ip = "";
			vmm.cmPrimarySubscriber.host_ip = "";
			vmm.cucxPrimarySubscriber.host_ip = "";
			vmm.impPrimarySubscriber.host_ip = "";
		}

		if (secondaryHostIdArray.length === 4 && secondaryHostIdArray[secondaryHostIdArray.length - 1] !== '') {
			let lastPortionSecondaryHostId = (parseInt(secondaryHostIdArray[secondaryHostIdArray.length - 1]));
			let firstPortionSecondaryHostId = secondaryHostIdArray.slice(0, 3).join(".");

			vmm.cmSecondarySubscriber.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 5).toString();
			vmm.cucxSecondaryPublisher.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 6).toString();
			vmm.impSecondarySubscriber.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 7).toString();
			// vmm.expcSecondarySubscriber.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 8).toString();
			// vmm.expeSecondaryPublisher.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 9).toString();

			// calculate dns records data
			build.dns_records.dns_to_ip.push({ dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cmSecondarySubscriber.host_ip });
			build.dns_records.dns_to_ip.push({ dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cucxSecondaryPublisher.host_ip });
			build.dns_records.dns_to_ip.push({ dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.impSecondarySubscriber.host_ip });

			build.dns_records.ip_to_dns.push({ dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionSecondaryHostId + 5).toString() });
			build.dns_records.ip_to_dns.push({ dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionSecondaryHostId + 6).toString() });
			build.dns_records.ip_to_dns.push({ dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionSecondaryHostId + 7).toString() });
		} else {
			vmm.cmSecondarySubscriber.host_ip = "";
			vmm.cucxSecondaryPublisher.host_ip = "";
			vmm.impSecondarySubscriber.host_ip = "";
		}

		// copy v_lan and hostgateway
		vmm.cmPrimaryPublisher.v_lan = build.primary_datacenter.v_lan;
		vmm.cmPrimarySubscriber.v_lan = build.primary_datacenter.v_lan;
		vmm.impPrimarySubscriber.v_lan = build.primary_datacenter.v_lan;
		vmm.cucxPrimarySubscriber.v_lan = build.primary_datacenter.v_lan;
		// vmm.expePrimaryPublisher.v_lan = build.primary_datacenter.v_lan;
		// vmm.expcSecondarySubscriber.v_lan = build.primary_datacenter.v_lan;
		vmm.cmSecondarySubscriber.v_lan = build.secondary_datacenter.v_lan;
		vmm.impSecondarySubscriber.v_lan = build.secondary_datacenter.v_lan;
		vmm.cucxSecondaryPublisher.v_lan = build.secondary_datacenter.v_lan;
		// vmm.expcSecondarySubscriber.v_lan = build.secondary_datacenter.v_lan;
		// vmm.expeSecondaryPublisher.v_lan = build.secondary_datacenter.v_lan;

		vmm.cmPrimaryPublisher.host_gateway = build.primary_datacenter.host_gateway;
		vmm.cmPrimarySubscriber.host_gateway = build.primary_datacenter.host_gateway;
		vmm.impPrimarySubscriber.host_gateway = build.primary_datacenter.host_gateway;
		vmm.cucxPrimarySubscriber.host_gateway = build.primary_datacenter.host_gateway;
		// vmm.expePrimaryPublisher.host_gateway = build.primary_datacenter.host_gateway;
		// vmm.expcSecondarySubscriber.host_gateway = build.primary_datacenter.host_gateway;
		vmm.cmSecondarySubscriber.host_gateway = build.secondary_datacenter.host_gateway;
		vmm.impSecondarySubscriber.host_gateway = build.secondary_datacenter.host_gateway;
		vmm.cucxSecondaryPublisher.host_gateway = build.secondary_datacenter.host_gateway;
		// vmm.expcSecondarySubscriber.host_gateway = build.secondary_datacenter.host_gateway;
		// vmm.expeSecondaryPublisher.host_gateway = build.secondary_datacenter.host_gateway;

		//copy DNS and NTP data, host data and certificates data
		vmm.cmPrimaryPublisher.dns_ntp =
			vmm.cmPrimarySubscriber.dns_ntp =
			vmm.cmSecondarySubscriber.dns_ntp =
			vmm.impPrimarySubscriber.dns_ntp =
			vmm.impSecondarySubscriber.dns_ntp =
			vmm.cucxPrimarySubscriber.dns_ntp =
			vmm.cucxSecondaryPublisher.dns_ntp = build.dns_ntp;

		vmm.cmPrimaryPublisher.host_data =
			vmm.cmPrimarySubscriber.host_data =
			vmm.cmSecondarySubscriber.host_data =
			vmm.impPrimarySubscriber.host_data =
			vmm.impSecondarySubscriber.host_data =
			vmm.cucxPrimarySubscriber.host_data =
			vmm.cucxSecondaryPublisher.host_data = build.host_data;

		vmm.cmPrimaryPublisher.certificates =
			vmm.cmPrimarySubscriber.certificates =
			vmm.cmSecondarySubscriber.certificates =
			vmm.impPrimarySubscriber.certificates =
			vmm.impSecondarySubscriber.certificates =
			vmm.cucxPrimarySubscriber.certificates =
			vmm.cucxSecondaryPublisher.certificates = build.certificates;

		return vmm;
	}

	checkTabs(): string[] {
		if (!this.form.valid) {
			let invalidTabs = [];
			if (this.checkCustomerInformation()) {
				// invalidTabs.push(BUILD_CONSTANTS.TabTitleCustomerInformation);
			}
			if (this.checkInfraestructureInformation()) {
				// invalidTabs.push(BUILD_CONSTANTS.TabTitleInfrastructure);
			}
			if (this.checkHostDataInformation()) {
				// invalidTabs.push(BUILD_CONSTANTS.TabTitleHostData);
			}
			return invalidTabs;
		}
		return null;
	}

	private checkCustomerInformation(): boolean {
		return (
			this.form.controls.customer_name.errors != null
			|| this.form.controls.customer_id_letters.errors != null
			|| this.form.controls.customer_id_numbers.errors != null
			|| this.form.controls.customer_ITC_location.errors != null
			|| this.form.controls.customer_address_1.errors != null
			|| this.form.controls.customer_address_2.errors != null
			|| this.form.controls.customer_city.errors != null
			|| this.form.controls.customer_state.errors != null
			|| this.form.controls.customer_zip_code.errors != null
			|| this.form.controls.customer_timezone.errors != null
			|| this.form.controls.customer_default_code_area.errors != null
			|| this.form.controls.customer_local_dial.errors != null
			|| this.form.controls.customer_extension_length.errors != null
			|| this.form.controls.customer_breakout_code.errors != null
			|| this.form.controls.customer_voice_mail_pilot.errors != null
			|| this.form.controls.server_domain.errors != null
			|| this.form.controls.size.errors != null
			|| this.form.controls.unified_messaging_username.errors != null
			|| this.form.controls.unified_messaging_password.errors != null
			|| this.form.controls.platform_test_account_username.errors != null
			|| this.form.controls.platform_test_account_password.errors != null
			|| this.form.controls.customer_notes.errors != null
		);
	}

	private checkInfraestructureInformation(): boolean {
		return (
			this.form.controls.primary_datacenter_name.errors != null
			|| this.form.controls.primary_datacenter_host_ip.errors != null
			|| this.form.controls.primary_datacenter_v_lan.errors != null
			|| this.form.controls.primary_datacenter_host_gateway.errors != null
			|| this.form.controls.primary_datacenter_asr_address.errors != null
			|| this.form.controls.secondary_datacenter_name.errors != null
			|| this.form.controls.secondary_datacenter_host_ip.errors != null
			|| this.form.controls.secondary_datacenter_v_lan.errors != null
			|| this.form.controls.secondary_datacenter_host_gateway.errors != null
			|| this.form.controls.secondary_datacenter_asr_address.errors != null
			|| this.form.controls.infrastructure_datacenter.errors != null
			|| this.form.controls.infrastructure_cluster.errors != null
			|| this.form.controls.infrastructure_datastore.errors != null
			|| this.form.controls.additional_network_data_vrf.errors != null
			|| this.form.controls.additional_network_data_nat_box_ip.errors != null
			|| this.form.controls.mra_expressway_primary_dc_external_ip.errors != null
			|| this.form.controls.mra_expressway_primary_dc_internal_ip.errors != null
			|| this.form.controls.mra_expressway_secondary_dc_external_ip.errors != null
			|| this.form.controls.mra_expressway_secondary_dc_internal_ip.errors != null
			|| this.form.controls.additional_services_expressway.errors != null
			|| this.form.controls.additional_services_singlewire.errors != null
			|| this.form.controls.additional_services_cuaca.errors != null
			|| this.form.controls.additional_services_egw.errors != null
			|| this.form.controls.additional_services_hybrid_services.errors != null
			|| this.form.controls.infrastructure_notes.errors != null
		);
	}

	private checkHostDataInformation(): boolean {
		return (
			this.form.controls.dns_ntp_primary_dns.errors != null
			|| this.form.controls.dns_ntp_secondary_dns.errors != null
			|| this.form.controls.dns_ntp_server_1.errors != null
			|| this.form.controls.dns_ntp_server_2.errors != null
			|| this.form.controls.dns_ntp_server_3.errors != null
			|| this.form.controls.dns_ntp_server_4.errors != null
			|| this.form.controls.dns_ntp_server_5.errors != null
			|| this.form.controls.host_data_timezone.errors != null
			|| this.form.controls.host_data_continent.errors != null
			|| this.form.controls.host_data_city.errors != null
			|| this.form.controls.host_data_admin.errors != null
			|| this.form.controls.host_data_password.errors != null
			|| this.form.controls.host_data_security_password.errors != null
			|| this.form.controls.host_data_app_user_password.errors != null
			|| this.form.controls.certificates_organization.errors != null
			|| this.form.controls.certificates_unit.errors != null
			|| this.form.controls.certificates_location.errors != null
			|| this.form.controls.certificates_state.errors != null
			|| this.form.controls.certificates_country.errors != null
			|| this.form.controls.certificates_auto_register_primary.errors != null
			|| this.form.controls.certificates_app_user_username.errors != null
			|| this.form.controls.host_data_notes.errors != null
		);
	}
}