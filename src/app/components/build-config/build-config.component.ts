import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Build } from 'src/app/Model/Build';
import Swal from 'sweetalert2';
import { NgbTypeahead, NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { VirtualMachine } from 'src/app/Model/VirtualMachine';
import { FormBuilder } from '@angular/forms';

const size = ['Small', 'Medium', 'Large'];
const states = ['Denver', 'Suwanee'];

@Component({
	selector: 'app-build-config',
	templateUrl: './build-config.component.html',
	styleUrls: ['./build-config.component.css']
})

export class BuildConfigComponent implements OnInit {

	currentBuild: Build;
	currentVM: VirtualMachine;

	//Review how this work
	@ViewChild("vmTabs", { static: true, read: NgbTabset })
	vmTabs: NgbTabset;

	form = this.fb.group({
		customer: this.fb.group({
			name: '',
			id_letters: '',
			id_numbers: '',
			ITC_location: '',
			address_1: '',
			address_2: '',
			city: '',
			state: '',
			zip_code: '',
			timezone: '',
			default_code_area: '',
			local_dial: '',
			extension_length: '',
			breakout_code: '',
			voice_mail_pilot: ''
		}),
		domain: this.fb.group({
			server_domain: '',
			presence_domain: ''
		}),
		size: '',
		unified_messaging: this.fb.group({
			username: '',
			password: ''
		}),
		platform_test_account: this.fb.group({
			username: '',
			password: ''
		}),
		customer_notes: '',
		primary_datacenter: this.fb.group({
			name: '',
			host_ip: '',
			v_lan: '',
			host_gateway: '',
			asr_address: ''
		}),
		secondary_datacenter: this.fb.group({
			name: '',
			host_ip: '',
			v_lan: '',
			host_gateway: '',
			asr_address: ''
		}),
		infrastructure: this.fb.group({
			datacenter: '',
			cluster: '',
			datastore: ''
		}),
		additional_network_data: this.fb.group({
			vrf: '',
			nat_box_ip: ''
		}),
		mra_expressway: this.fb.group({
			primary_dc_external_ip: '',
			primary_dc_internal_ip: '',
			secondary_dc_external_ip: '',
			secondary_dc_internal_ip: ''
		}),
		additional_services: this.fb.group({
			expressway: '',
			singlewire: '',
			cuaca: '',
			egw: '',
			hybrid_services: ''
		}),
		infrastructure_notes: '',
		dns_ntp: this.fb.group({
			primary_dns: '',
			secondary_dns: '',
			ntp_server_1: '',
			ntp_server_2: '',
			ntp_server_3: '',
			ntp_server_4: '',
			ntp_server_5: ''
		}),
		host_data: this.fb.group({
			timezone: '',
			continent: '',
			city: '',
			admin: '',
			password: '',
			security_password: '',
			app_user_password: ''
		}),
		certificates: this.fb.group({
			organization: '',
			unit: '',
			location: '',
			state: '',
			country: '',
			auto_register_primary: '',
			app_user_username: ''
		}),
		host_data_notes: '',
	}); //TODO Validators

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private buildsService: BuildsService,
		private fb: FormBuilder
	) {	}

	ngOnInit() {
		const build_id = this.route.snapshot.paramMap.get('id');
		this.currentBuild = build_id == "0" ? this.buildsService.createEmptyBuild() : this.buildsService.getBuild(build_id);
		this.currentVM = this.currentBuild.vms != null && this.currentBuild.vms.length > 0 ? this.currentBuild.vms[0] : null;

		const objForm = this.currentBuild.getFormDataBuild();
		this.form.setValue(objForm);
	}

	onTabChange($event: NgbTabChangeEvent) {
		this.setVMValues($event.nextId);
	}

	setVMValues(vm_id: string) {
		for (var i = 0; i < this.currentBuild.vms.length; i++) {
			if (this.currentBuild.vms[i].id === vm_id) {
				this.currentVM = this.currentBuild.vms[i];
			}
		}
	}

	back() {
		window.history.back();
	}

	validationLogs(build_id: string) {
		this.router.navigate(["logs", build_id, "validation"]);
	}

	validateProvision(build_id: string) {
		Swal.fire({
			title: 'Are you sure?',
			text: "Build Provisioning validation process will start",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, start validation process'
		}).then((result) => {
			if (result.value) {
				this.router.navigate(["logs", build_id, "validation"]);
				Swal.fire(
					'Started!',
					'Build provisioning validation process started sucessfully',
					'success'
				)
			}
		})

	}
	
	calculateData() {
		//TODO check valid data
		this.currentBuild.setFormDataBuild(this.form.getRawValue());
		this.buildsService.calculateData(this.currentBuild);
	}
	
	onSubmit() {
		this.calculateData();
		
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, save changes!'
		}).then((result) => {
			if (result.value) {
				this.router.navigate(["build_config", this.buildsService.updateBuild(this.currentBuild.id, this.currentBuild).id]);
				Swal.fire(
					'Saved!',
					'Changes applied',
					'success'
				)
			}
		})
	}

}
