import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Build } from 'src/app/Model/Build';
import { VirtualMachine } from 'src/app/Model/VirtualMachine';

@Component({
	selector: 'app-vm-model-medium-tabs',
	templateUrl: './vm-model-medium-tabs.component.html',
	styleUrls: ['./vm-model-medium-tabs.component.css']
})
export class VmModelMediumTabsComponent implements OnInit {

	//Review how this work
	@ViewChild("vmTabs", { static: true, read: NgbTabset }) vmTabs: NgbTabset;

	@Input() currentBuild: Build;

	currentVirtualMachine: VirtualMachine;

	constructor() { }

	ngOnInit() {
		this.updateData();
	}

	updateData() {
		this.currentBuild = new Build(this.currentBuild);
		this.currentVirtualMachine = this.currentBuild.vms != null ? this.currentBuild.vms.getFirstVirtualMachine() : null;
	}

	onTabChange($event: NgbTabChangeEvent) {
		this.currentVirtualMachine = this.currentBuild.vms != null ? this.currentBuild.vms[$event.nextId] : null;
	}

}
