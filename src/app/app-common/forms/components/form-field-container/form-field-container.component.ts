import {
	Component,
	ContentChild,
	ViewChild,
	AfterViewInit,
	ElementRef,
	Renderer2
} from '@angular/core';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { FormControlName, AbstractControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroupDivDirective } from '../../directives/form-group-div.directive';
import { RequestComponent } from '../../clases/request-component';

@Component({
	selector: 'common-form-field-container',
	templateUrl: './form-field-container.component.html',
	styleUrls: ['./form-field-container.component.css']
})
export class FormFieldContainerComponent extends RequestComponent implements AfterViewInit {

	@ContentChild(FormControlName, {
		static: false
	}) controlName: FormControlName;
	@ContentChild(FormGroupDivDirective, {
		read: ElementRef,
		static: false
	}) label: ElementRef;
	@ViewChild(FormErrorsComponent, {
		static: false
	}) formErrorsComponent: FormErrorsComponent;

	statusChanged$ = new Subject<string>();

	control: AbstractControl;

	invalid = false;

	constructor(
		private renderer: Renderer2,
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
				if (status === 'INVALID') {
					this.invalid = true;
					if (this.label) {
						this.renderer.addClass(this.label.nativeElement, 'is-invalid-label');
					}
				} else {
					this.invalid = false;
					if (this.label) {
						this.renderer.removeClass(this.label.nativeElement, 'is-invalid-label');
					}
				}
				this.statusChanged$.next(status);
			}
		);
	}
}
