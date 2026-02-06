import { Email } from "./email";
import { LoginInfo } from "./login-info";
import { PersonalInfo } from "./personal-info";

// Entity representing all the values contained in the registration form. 
// Used only within the complex-form feature component.
export class ComplexFormValue {
    personalInfo!: PersonalInfo;
    contactPreference!: string;
    email?: Email;
    phone?: string;
    loginInfo!: LoginInfo;
}