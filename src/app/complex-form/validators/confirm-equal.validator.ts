import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(field: string, confirmField: string): ValidatorFn {

    return (control: AbstractControl): null | ValidationErrors => {

        if (!control.get(field) || !control.get(confirmField)) {
            return { confirmEqual: 'Invalid control names' };
        }

        const fieldValue = control.get(field)!.value;
        const confirmFieldValue = control.get(confirmField)!.value;

        return fieldValue === confirmFieldValue ? null : { confirmEqual: { field: fieldValue, confirmField: confirmFieldValue } };
    }
}