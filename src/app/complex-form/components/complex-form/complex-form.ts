import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { map, Observable, startWith, tap } from 'rxjs';
import { PASSWORD_REGEX, PHONE_REGEX } from '../../../core/constants/regex.constants';
import { ComplexFormService } from '../../services/complex-form.service';

@Component({
  selector: 'app-complex-form',
  imports: [CommonModule, MatCheckboxModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatAnchor, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './complex-form.html',
  styleUrl: './complex-form.scss',
  standalone: true
})
export class ComplexForm implements OnInit {

  // Forms
  personalInfoForm!: FormGroup;
  emailForm!: FormGroup;
  loginInfoForm!: FormGroup;
  mainForm!: FormGroup;

  // Controls
  contactPreferenceControl!: FormControl;
  emailControl!: FormControl;
  confirmEmailControl!: FormControl;
  phoneControl!: FormControl;
  passwordControl!: FormControl;
  confirmPasswordControl!: FormControl;

  // Observables
  showEmailControl$!: Observable<boolean>;
  showPhoneControl$!: Observable<boolean>;

  // Default value for radio buttons
  defaultValueForContactPreferenceControl: string = 'email';

  // Spinner
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private complexFormService: ComplexFormService) { }

  ngOnInit(): void {
    this.initPersonalInfoForm();
    this.initContactPreferenceControl();
    this.initEmailForm();
    this.initPhoneControl();
    this.initLoginInfoForm();
    this.initMainForm();

    this.initFormObservables();
  }

  getEmailControlErrorText(control: AbstractControl): string {

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('email')) {
      return 'Email address invalid';
    }

    return 'This field contains an error';
  }

  getPhoneControlErrorText(control: AbstractControl): string {

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('pattern')) {
      return 'The phone number must start with 0 or +33 and be followed by 9 digits';
    }

    return 'This field contains an error';
  }

  getPasswordControlErrorText(control: AbstractControl): string {

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('pattern')) {
      return 'Your password must start with a capital letter and contain at least 8 characters, including a number and a special character';
    }

    return 'This field contains an error';
  }

  onSubmitForm(): void {
    this.loading = true;

    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(isUserInfoSaved => {
        this.loading = false;
        if (isUserInfoSaved) {
          this.mainForm.reset();
        } else {
          console.error('Save operation failed');
        }
      })
    ).subscribe();
  }

  private initPersonalInfoForm(): void {
    this.personalInfoForm = this.formBuilder.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  private initContactPreferenceControl(): void {
    this.contactPreferenceControl = this.formBuilder.nonNullable.control(this.defaultValueForContactPreferenceControl); // Radio button
  }

  private initEmailForm(): void {
    this.emailControl = this.formBuilder.nonNullable.control('');
    this.confirmEmailControl = this.formBuilder.nonNullable.control('');

    this.emailForm = this.formBuilder.nonNullable.group({ email: this.emailControl, confirm: this.confirmEmailControl });
  }

  private initPhoneControl(): void {
    this.phoneControl = this.formBuilder.nonNullable.control('');
  }

  private initLoginInfoForm(): void {
    this.passwordControl = this.formBuilder.nonNullable.control('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]);
    this.confirmPasswordControl = this.formBuilder.nonNullable.control('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]);

    this.loginInfoForm = this.formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: this.passwordControl,
      confirm: this.confirmPasswordControl
    });
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.nonNullable.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceControl,
      email: this.emailForm,
      phone: this.phoneControl,
      loginInfo: this.loginInfoForm
    });
  }

  private initFormObservables(): void {

    // Email contact preference
    this.showEmailControl$ = this.contactPreferenceControl.valueChanges.pipe(
      startWith(this.contactPreferenceControl.value),
      map(contactPreferenceValue => contactPreferenceValue === 'email'),
      tap(isEmailSelected => { this.setEmailValidators(isEmailSelected) })
    );

    // Phone contact preference
    this.showPhoneControl$ = this.contactPreferenceControl.valueChanges.pipe(
      startWith(this.contactPreferenceControl.value),
      map(contactPreferenceValue => contactPreferenceValue === 'phone'),
      tap(isPhoneSelected => { this.setPhoneValidators(isPhoneSelected) })
    );
  }

  private setEmailValidators(isEmailSelected: boolean): void {

    if (isEmailSelected) {
      this.emailControl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailControl.addValidators([Validators.required, Validators.email]);
    } else {
      this.emailControl.clearValidators();
      this.confirmEmailControl.clearValidators();
    }

    // It must be called whenever validators are added or removed
    this.emailControl.updateValueAndValidity();
    this.confirmEmailControl.updateValueAndValidity();
  }

  private setPhoneValidators(isPhoneSelected: boolean): void {

    if (isPhoneSelected) {
      this.phoneControl.addValidators([Validators.required, Validators.pattern(PHONE_REGEX)]);
    } else {
      this.phoneControl.clearValidators();
    }

    this.phoneControl.updateValueAndValidity(); // It must be called whenever validators are added or removed
  }

}
