import { Directive, Input, OnInit } from '@angular/core';
import { FormErrors } from '../models/form-errors';
import { DEFAULT_FORM_ERRORS_MESSAGES } from '../constants/default-messages';

@Directive({
  selector: '[commonFormErrors]'
})
export class FormErrorsDirective implements OnInit {

  @Input('commonFormErrors') errors: FormErrors;

  constructor() { }

  ngOnInit() {
    this.errors = this.errors || DEFAULT_FORM_ERRORS_MESSAGES;
  }
}
