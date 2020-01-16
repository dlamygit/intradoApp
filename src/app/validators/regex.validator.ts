import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * @description
 * empty or alphanumeric
 * 
 * @param control 
 */
export function alphanumeric(control: AbstractControl): ValidationErrors | null {
    return /^[a-z0-9]*$/i.test(control.value) ? null : { 'alphanumeric': {value: control.value}};
}

/**
 * @description
 * empty or numeric
 * 
 * @param control 
 */
export function numeric(control: AbstractControl): ValidationErrors | null {
    return !control.value || /^[0-9]*$/i.test(control.value) ? null : { 'numeric': {value: control.value}};
}

/**
 * @description
 * empty or alphabetic
 * 
 * @param control 
 */
export function alphabetic(control: AbstractControl): ValidationErrors | null {
    return /^[a-z]*$/i.test(control.value) ? null : { 'alphabetic': {value: control.value}};
}

/**
 * @description
 * empty or any ASCII between ! and ~
 * 
 * @param control 
 */
export function printable(control: AbstractControl): ValidationErrors | null {
    return /^[!-~]*$/i.test(control.value) ? null : { 'printable': {value: control.value}};
}

/**
 * @description
 * empty or any ASCII between ! and ~ with at least one digit and length between 6 and 15
 * 
 * @param control 
 */
export function adminPassword(control: AbstractControl): ValidationErrors | null {
    const regex = /^((?=.*[0-9])([!-~]+))*$/i.test(control.value);
    const isValid = !control.value || control.value === "" || (regex && control.value.length >= 6 && control.value.length <= 15 );
    return isValid ? null : { 'adminPassword': {value: control.value}};
}

/**
 * @description
 * empty or alphabhetic including hyphens and underscores starting with a letter
 * 
 * @param control 
 */
export function username(control: AbstractControl): ValidationErrors | null {
    return !control.value || control.value === "" || /^([a-z]([a-z\d_-]+))*$/i.test(control.value) ? null : { 'username': {value: control.value}};
}

/**
 * @description
 * empty or any ASCII between ! and ~ with at least one digit and length between 6 and 19
 * 
 * @param control 
 */
export function userPassword(control: AbstractControl): ValidationErrors | null {
    const regex = /^((?=.*[0-9])([!-~]+))*$/i.test(control.value);
    const isValid = !control.value || control.value === "" || (regex && control.value.length >= 6 && control.value.length <= 19 );
    return isValid ? null : { 'userPassword': {value: control.value}};
}

/**
 * @description
 * empty or ip format
 * 
 * @param control
 */
export function ipFormat(control: AbstractControl): ValidationErrors | null {
    const regex = /^(?!0\.0\.0\.0)(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/.test(control.value);
    return !control.value || control.value === "" || regex ? null : { 'ipFormat': {value: control.value}};
}

/**
 * @description
 * empty or (alphanumeric, spaces, tabs and . , - _ : ; { } ( ) [ ])
 * 
 * @param control
 */
export function certificate(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-z\d \t\][.,:;{}()-]*$/i.test(control.value);
    return !control.value || control.value === "" || regex ? null : { 'certificate': {value: control.value}};
}

/**
 * @description
 * empty or (alphanumeric, hyphens up to 63 characteres and starting with an alphabetic character)
 * 
 * @param control
 */
export function hostName(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-z][a-z\d-]*$/i.test(control.value);
    const isValid = !control.value || control.value === "" || (regex && control.value <= 63 );
    return isValid ? null : { 'hostName': {value: control.value}};
}

/**
 * @description
 * empty or (mask net format)
 * 
 * @param control
 */
export function netMask(control: AbstractControl): ValidationErrors | null {
    const isValid = isValidMask(control.value) || control.value === "";
    return isValid ? null : { 'netMask': {value: control.value}};
}

function isValidMask (mask: string) {
    switch(mask) {
        case "0.0.0.0":
        case "128.0.0.0":
        case "192.0.0.0":
        case "224.0.0.0":
        case "240.0.0.0":
        case "248.0.0.0":
        case "252.0.0.0":
        case "254.0.0.0":
        case "255.0.0.0":
        case "255.128.0.0":
        case "255.192.0.0":
        case "255.224.0.0":
        case "255.240.0.0":
        case "255.248.0.0":
        case "255.252.0.0":
        case "255.254.0.0":
        case "255.255.0.0":
        case "255.255.128.0":
        case "255.255.192.0":
        case "255.255.224.0":
        case "255.255.240.0":
        case "255.255.248.0":
        case "255.255.252.0":
        case "255.255.254.0":
        case "255.255.255.0":
        case "255.255.255.128":
        case "255.255.255.192":
        case "255.255.255.224":
        case "255.255.255.240":
        case "255.255.255.248":
        case "255.255.255.252":
        case "255.255.255.254":
        case "255.255.255.255":
            return true;
        default:
            return false;
    }
}