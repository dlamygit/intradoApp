import {
	Component,
	ContentChild,
	ElementRef,
	Renderer2,
	ViewChild
} from '@angular/core';
import {
	NG_VALUE_ACCESSOR,
	FormGroup,
	ControlValueAccessor,
	NG_VALIDATORS,
	Validator,
	AbstractControl,
	ValidationErrors,
} from '@angular/forms';
import { FormGroupDivDirective } from '../../directives/form-group-div.directive';
import { FormErrors } from '../../models/form-errors';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { takeUntil } from 'rxjs/operators';
import { RequestComponent } from '../../clases/request-component';

@Component({
	selector: 'common-form-group-field',
	templateUrl: './form-group-field.component.html',
	styleUrls: ['./form-group-field.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FormGroupFieldComponent,
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: FormGroupFieldComponent,
			multi: true
		}
	]
})
export class FormGroupFieldComponent extends RequestComponent implements ControlValueAccessor, Validator {

	@ContentChild(FormGroupDivDirective, {
		read: ElementRef,
		static: false
	}) div: ElementRef;
	@ViewChild(FormErrorsComponent,
		{ static: false }
	) formErrorsComponent: FormErrorsComponent;

	form: FormGroup;

	errors: FormErrors;
	errorsMsgs: string[] = [];
	lastStatus: string;
	invalid = false;

	constructor(
		private renderer: Renderer2,
	) {
		super();
	}

	registerForm(childForm: FormGroup) {
		this.form = childForm;
		this.form.valueChanges.subscribe(this.onChanges);
		this.form.updateValueAndValidity();

		// inicializamos los errores
		this.formErrorsComponent.initComponent(childForm);
		this.formErrorsComponent.statusChanged$.pipe(
			takeUntil(this.destroyed$)
		).subscribe(
			(status: string) => {
				if (!this.div) { return; }
				if (status === 'INVALID') {
					this.renderer.addClass(this.div.nativeElement, 'is-invalid-label');
				} else {
					this.renderer.removeClass(this.div.nativeElement, 'is-invalid-label');
				}
			}
		);
	}

	onTouched: () => void = () => { };

	onChanges: (value: any) => void = () => { };

	writeValue(obj: any): void {
		if (this.form && obj) {
			this.form.setValue(obj, {
				emitEvent: false
			});
		}
	}

	registerOnChange(fn: any): void {
		this.onChanges = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		if (this.form) {
			if (isDisabled) {
				this.form.disable();
			} else {
				this.form.enable();
			}
		}
	}

	validate(control: AbstractControl): ValidationErrors {
		if (!this.form) {
			return null;
		}

		if (this.form.valid) {
			return null;
		}
		return {
			formGroup: this.form.errors
		};
	}

	registerOnValidatorChange?(fn: () => void): void {
	}
}
