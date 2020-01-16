import { FormErrors } from '../models/form-errors';

export const DEFAULT_FORM_ERRORS_MESSAGES: FormErrors = {
    alphanumeric: "the value may contain only letters and numbers",
    alphabetic: "the value may contain only letters",
    numeric: "the value must be numeric",
    adminPassword: "the value must have the admin password format (1)",
    username: "the value must have the username format (2)",
    userPassword: "the value must have the user password format (3)",
    ipFormat: "the value must be an IP valid",
    certificate: "the value must have the certificate format (4)",
    hostName: "the value must have the host name format",
    required: "this value is required",
    generic: "the value is invalid"
};
