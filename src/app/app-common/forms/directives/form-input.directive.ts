import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormFieldComponent } from '../components/form-field/form-field.component';

@Directive({
  selector: '[commonFormInput]'
})
export class FormInputDirective implements OnInit {

  constructor(
    private formFieldComponent: FormFieldComponent,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.formFieldComponent.statusChanged$.subscribe(
      (status) => this.checkInputStatus(status)
    );
  }

  checkInputStatus(status: string) {
    if (status === 'INVALID') {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid-input');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid-input');
    }
  }
}
