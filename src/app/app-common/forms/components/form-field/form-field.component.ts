import { Component, ContentChild, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroupDirective, AbstractControl, FormControlName } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { RequestComponent } from '../../clases/request-component';

@Component({
	selector: 'common-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent extends RequestComponent implements AfterViewInit {

	@ContentChild(FormControlName, {
		static: true
	}) controlName: FormControlName;
	@ViewChild(FormErrorsComponent, {
		static: true
	}) formErrorsComponent: FormErrorsComponent;

	statusChanged$ = new Subject<string>();

	control: AbstractControl;

	invalid = false;

	constructor(
		private formGroupDirective: FormGroupDirective,
	) {
		super();
	}

	ngAfterViewInit() {
		this.control = this.formGroupDirective.getControl(this.controlName);

		this.formErrorsComponent.initComponent(this.control);

		this.formErrorsComponent.statusChanged$.pipe(
			takeUntil(this.destroyed$)
		).subscribe(
			(status) => {
				this.invalid = (status === 'INVALID');
				this.statusChanged$.next(status);
			}
		);
	}
}
