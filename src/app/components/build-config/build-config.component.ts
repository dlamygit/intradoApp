import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildsService } from 'src/app/service/builds.service';
import { Build } from 'src/app/Model/Build';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { BuildConfigFormService } from './services/build-config-form-service';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { RequestComponent } from 'src/app/app-common/forms/clases/request-component';
import { BUILD_CONSTANTS } from 'src/app/constants/build-constants';
import { ERROR_CONSTANTS } from 'src/app/constants/errors-constatns';

const size = ['Small', 'Medium', 'Large']; //TODO from constants service
const states = ['Denver', 'Suwanee'];	//TODO from constants service

@Component({
	selector: 'app-build-config',
	templateUrl: './build-config.component.html',
	styleUrls: ['./build-config.component.css'],
	providers: [
		BuildConfigFormService
	]
})

export class BuildConfigComponent extends RequestComponent implements OnInit {

	currentBuild: Build;
	vmModelIdTab = 'vm_model';
	dnsRecordsIdTab = 'dns_records';

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private buildsService: BuildsService,
		private buildConfigFormService: BuildConfigFormService
	) {
		super();
	}

	ngOnInit() {
		const build_id = this.route.snapshot.paramMap.get('id');
		this.currentBuild = build_id == "0" ? this.buildsService.createEmptyBuild() : this.buildsService.getBuild(build_id);

		const objForm = this.currentBuild.getFormDataBuild();
		this.form.setValue(objForm);
		this.resetData();
	}

	get form(): FormGroup {
		return this.buildConfigFormService.form;
	}

	back() {
		window.history.back();
	}

	validationLogs(build_id: string) { //change to router link in the button
		this.router.navigate(["logs", build_id, "validation"]);
	}

	validateProvision(build_id: string) {
		this.resetData();

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

	private resetData() {
		this.currentBuild.setFormDataBuild(this.form.getRawValue());
		this.buildConfigFormService.calculateData(this.currentBuild);
	}

	onSubmit() {
		const invalidTabs = this.buildConfigFormService.checkTabs();
		
		if (invalidTabs != null) {
			let itemsReferenceErrors = [
				ERROR_CONSTANTS.ReferenceErrorAdminPassword,
				ERROR_CONSTANTS.ReferenceErrorUsername,
				ERROR_CONSTANTS.ReferenceErrorUserPassword,
				ERROR_CONSTANTS.ReferenceErrorCertificate,
				ERROR_CONSTANTS.ReferenceAsciiPrintable
			];

			this.feedback.setText(ERROR_CONSTANTS.ReferenceTableErrors, true, itemsReferenceErrors);
			return;
		}
		this.resetData();

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

	onTabChange($event: NgbTabChangeEvent) {
		if ($event.nextId === this.vmModelIdTab || $event.nextId === this.dnsRecordsIdTab) {
			this.resetData();
		}
	}

	get titleTabCustomerInformation() {
		return BUILD_CONSTANTS.TabTitleCustomerInformation;
	}

	get titleTabInfraestructure() {
		return BUILD_CONSTANTS.TabTitleInfrastructure;
	}

	get titleTabHostData() {
		return BUILD_CONSTANTS.TabTitleHostData;
	}
}
