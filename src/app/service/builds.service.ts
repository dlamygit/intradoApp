import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Build } from '../Model/Build';
import { BehaviorSubject, Observable, bindCallback } from 'rxjs';
import { Logs } from '../Model/Logs';
import { BUILDS } from '../mocks/mock-build';
import { LOGS } from '../mocks/mock-logs';
import { BUILD_CONSTANTS } from '../constants/build-constants';
import { VirtualMachineModelMedium } from '../Model/VirtualMachineModelMedium';
import { DNSRecord } from '../Model/DNSRecord';

@Injectable({
	providedIn: 'root'
})
export class BuildsService {

	STORAGE_BUILDS: string = "builds";
	STORAGE_LOGS: string = "logs";
	builds: Build[] = new Array<Build>();
	logs: Logs[] = new Array<Logs>();

	private buildsSource = new BehaviorSubject<Build[]>(null);
	buildsN = this.buildsSource.asObservable();

	private currentBuildSource = new BehaviorSubject<Build>(null);
	currentBuild = this.currentBuildSource.asObservable();

	getBuildStatus(id: string): string {
		return this.getBuild(id).status;
	}
	//GET builds
	getBuilds(): Build[] {
		return this.storage.get(this.STORAGE_BUILDS);
	}

	//GET individual Build
	getBuild(id: string): Build {
		const obj = this.getBuilds().find(build => build.id === id);
		const build = new Build(obj);
		return build;
	}

	getID(size: number): string {
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		var _id: string = "";
		for (let i = 0; i < 8; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 4; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 4; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 4; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 12; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return _id;
	}


	createEmptyBuild(): Build {
		var emptyBuild = new Build();

		emptyBuild.setInitialData(BUILDS.emptyBuild);

		return emptyBuild;
	}

	createEmptyLog(build_id: string): Logs {

		var emptyLog: Logs = {
			"build_id": build_id,
			"validationLogs": [],
			"executionLogs": []
		}

		return emptyLog;
	}

	getAllLogs(): Logs[] {
		return this.storage.get(this.STORAGE_LOGS);
	}
	//POST Build
	addBuild(build: Build): Build {

		var _id: string = this.getID(64);
		build.id = _id;

		//Agregar build
		this.builds = this.getBuilds().concat(build);

		//Almacenar en localstorage
		this.storage.set(this.STORAGE_BUILDS, this.builds);
		//Actualizar el observable
		this.buildsSource.next(this.builds);

		//Create logs for the build created
		this.logs = this.getAllLogs().concat(this.createEmptyLog(build.id));
		this.storage.set(this.STORAGE_LOGS, this.logs);

		//Just for checking that was added
		return this.getBuild(build.id);
	}

	//PUT Build
	updateBuild(id: string, build: Build): Build {

		if (id == "0") {
			return this.addBuild(build);
		}
		else {

			for (var i = 0; i < this.builds.length; i++) {
				if (this.builds[i].id == id) {
					this.builds[i] = build;
				}
			}

			this.storage.set(this.STORAGE_BUILDS, this.builds);
			//Actualizar el observable
			this.buildsSource.next(this.builds);

			return this.getBuild(id);
		}

	}

	//DELETE Build
	deleteBuild(id: string) {
		this.builds = this.getBuilds();

		for (var i = 0; i < this.builds.length; i++) {
			if (this.builds[i].id == id) {
				this.builds.splice(i, 1);
			}
		}

		this.storage.set(this.STORAGE_BUILDS, this.builds);
		this.buildsSource.next(this.builds);
	}

	runBuild(id: string) {
		console.log("Runnning build: " + id);
	}

	getLogs(build_id: string): Logs {
		return this.storage.get(this.STORAGE_LOGS).find(logs => logs.build_id === build_id);
	}

	constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

		//Incomplete Builds
		var b1 = new Build();
		b1.setInitialData(BUILDS.b1);

		var b2 = new Build();
		b2.setInitialData(BUILDS.b2);

		var b3 = new Build();
		b3.setInitialData(BUILDS.b3);

		var b4 = new Build();
		b4.setInitialData(BUILDS.b4);

		var b5 = new Build();
		b5.setInitialData(BUILDS.b5);

		var b6 = new Build();
		b6.setInitialData(BUILDS.b6);

		var b7 = new Build();
		b7.setInitialData(BUILDS.b7);

		this.builds.push(b1);
		this.builds.push(b2);
		this.builds.push(b3);
		this.builds.push(b4);
		this.builds.push(b5);
		this.builds.push(b6);
		this.builds.push(b7);

		this.storage.set(this.STORAGE_BUILDS, this.builds);
		this.buildsSource.next(this.builds);

		var logs1: Logs = LOGS.log1;
		var logs2: Logs = LOGS.log2;
		var logs3: Logs = LOGS.log3;
		var logs4: Logs = LOGS.log4;
		var logs5: Logs = LOGS.log5;
		var logs6: Logs = LOGS.log6;
		var logs7: Logs = LOGS.log7;

		this.logs.push(logs1);
		this.logs.push(logs2);
		this.logs.push(logs3);
		this.logs.push(logs4);
		this.logs.push(logs5);
		this.logs.push(logs6);
		this.logs.push(logs7);

		this.storage.set(this.STORAGE_LOGS, this.logs);
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
			let firstPortionPrimaryHostId = primaryHostIdArray.slice(0,3).join(".");
			
			vmm.cmPrimaryPublisher.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 5).toString();
			vmm.cmPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 6).toString();
			vmm.cucxPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 7).toString();
			vmm.impPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 8).toString();
			// vmm.expcPrimarySubscriber.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 9).toString();
			// vmm.expePrimaryPublisher.host_ip = firstPortionPrimaryHostId + "." + (lastPortionPrimaryHostId + 10).toString();

			// calculate dns records data			 
			build.dns_records.dns_to_ip.push({dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cmPrimaryPublisher.host_ip});
			build.dns_records.dns_to_ip.push({dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cmPrimarySubscriber.host_ip});
			build.dns_records.dns_to_ip.push({dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cucxPrimarySubscriber.host_ip});
			build.dns_records.dns_to_ip.push({dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.impPrimarySubscriber.host_ip});

			build.dns_records.ip_to_dns.push({dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 5).toString()});
			build.dns_records.ip_to_dns.push({dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 6).toString()});
			build.dns_records.ip_to_dns.push({dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 7).toString()});
			build.dns_records.ip_to_dns.push({dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.primary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.primary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionPrimaryHostId + 8).toString()});
		} else {
			vmm.cmPrimaryPublisher.host_ip = "";
			vmm.cmPrimarySubscriber.host_ip = "";
			vmm.cucxPrimarySubscriber.host_ip = "";
			vmm.impPrimarySubscriber.host_ip = "";
		}
		
		if (secondaryHostIdArray.length === 4 && secondaryHostIdArray[secondaryHostIdArray.length - 1] !== '') {
			let lastPortionSecondaryHostId = (parseInt(secondaryHostIdArray[secondaryHostIdArray.length - 1]));
			let firstPortionSecondaryHostId = secondaryHostIdArray.slice(0,3).join(".");

			vmm.cmSecondarySubscriber.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 5).toString();
			vmm.cucxSecondaryPublisher.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 6).toString();
			vmm.impSecondarySubscriber.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 7).toString();
			// vmm.expcSecondarySubscriber.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 8).toString();
			// vmm.expeSecondaryPublisher.host_ip = firstPortionSecondaryHostId + "." + (lastPortionSecondaryHostId + 9).toString();

			// calculate dns records data
			build.dns_records.dns_to_ip.push({dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cmSecondarySubscriber.host_ip});
			build.dns_records.dns_to_ip.push({dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].First + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.cucxSecondaryPublisher.host_ip});
			build.dns_records.dns_to_ip.push({dns: build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second + BUILD_CONSTANTS.DnsToIPEnd, ip: vmm.impSecondarySubscriber.host_ip});

			build.dns_records.ip_to_dns.push({dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.CUCM + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionSecondaryHostId + 5).toString()});
			build.dns_records.ip_to_dns.push({dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.UNITY + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.PUBLISHER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].First).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionSecondaryHostId + 6).toString()});
			build.dns_records.ip_to_dns.push({dns: (build.customer.id_letters + build.customer.id_numbers + BUILD_CONSTANTS.PRESENCE + BUILD_CONSTANTS.ClusterNumbers[build.secondary_datacenter.name] + BUILD_CONSTANTS.SUBSCRIBER + BUILD_CONSTANTS.ServerNumbers[build.size][build.secondary_datacenter.name].Second).toUpperCase() + BUILD_CONSTANTS.DnsRevertEnd, ip: (lastPortionSecondaryHostId + 7).toString()});
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
}

