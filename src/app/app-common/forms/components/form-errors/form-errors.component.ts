import { Component, OnInit, Input, Optional, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { FormErrors } from '../../models/form-errors';
import { FormErrorsDirective } from '../../directives/form-errors.directive';
import { DEFAULT_FORM_ERRORS_MESSAGES } from '../../constants/default-messages';
import { Subject } from 'rxjs';
import { RequestComponent } from '../../clases/request-component';

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'common-form-errors',
	templateUrl: './form-errors.component.html',
	styleUrls: ['./form-errors.component.css']
})
export class FormErrorsComponent extends RequestComponent implements OnInit {

	@Input() control: AbstractControl;

	statusChanged$ = new Subject<string>();

	errors: FormErrors;
	errorsMsgs: string[] = [];

	lastStatus: string;
	invalid = false;

	constructor(
		private formGroupDirective: FormGroupDirective,
		@Optional() private formErrorsDirective: FormErrorsDirective
	) {
		super();
	}

	ngOnInit() {
		this.errors = this.formErrorsDirective ? this.formErrorsDirective.errors : DEFAULT_FORM_ERRORS_MESSAGES;

		if (this.control) {
			this.initComponent(this.control);
		}
	}

	initComponent(control: AbstractControl) {
		this.control = control;
		this.formGroupDirective.ngSubmit.pipe(
			takeUntil(this.destroyed$)
		).subscribe(
			() => {
				this.control.markAsTouched({
					onlySelf: true
				});
				this.control.updateValueAndValidity();
			}
		);

		this.control.statusChanges.pipe(
			takeUntil(this.destroyed$)
		).subscribe(
			(status) => this.checkFieldStatus(status)
		);
	}

	checkFieldStatus(status: string) {
		if (this.lastStatus === status && status !== 'INVALID') { return; }
		this.lastStatus = status;

		this.statusChanged$.next(status);

		if (status === 'INVALID' && this.control.errors) {
			this.invalid = true;
			this.getErrors();
		} else {
			this.invalid = false;
			this.errorsMsgs = [];
		}
	}

	getErrors() {
		const errors = [];
		for (const error in this.control.errors) {
			if (this.control.errors.hasOwnProperty(error)) {
				errors.push(this.parseError(error));
			}
		}
		this.errorsMsgs = errors;
	}

	parseError(errorKey: string): string {
		const error = this.control.errors[errorKey];
		if (typeof (error) !== 'object') {
			return this.errors[errorKey];
		}
		let errorString = this.errors[errorKey];
		for (const prop in error) {
			if (error.hasOwnProperty(prop)) {
				errorString = errorString.replace(`{{${prop}}}`, error[prop]);
			}
		}
		return errorString;
	}
}
