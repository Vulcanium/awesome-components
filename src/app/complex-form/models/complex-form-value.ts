// Entity representing all the values contained in the registration form. 
// Used only within the complex-form feature component.
export class ComplexFormValue {
    personalInfo!: {
        firstName: string,
        lastName: string
    };

    contactPreference!: string;

    email?: {
        email: string,
        confirm: string
    };

    phone?: string;

    loginInfo!: {
        username: string,
        password: string,
        confirmPassword: string,
    };
}