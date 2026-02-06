import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-complex-form',
  imports: [MatCheckboxModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatAnchor, MatFormFieldModule, MatInputModule],
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPersonalInfoForm();
    this.initContactPreferenceControl();
    this.initEmailForm();
    this.initPhoneControl();
    this.initLoginInfoForm();
    this.initMainForm();
  }

  onSubmitForm(): void {
    console.log(this.mainForm.value);
  }

  private initPersonalInfoForm(): void {
    this.personalInfoForm = this.formBuilder.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  private initContactPreferenceControl(): void {
    this.contactPreferenceControl = this.formBuilder.nonNullable.control('email'); // Radio button
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
    this.passwordControl = this.formBuilder.nonNullable.control('', Validators.required);
    this.confirmPasswordControl = this.formBuilder.nonNullable.control('', Validators.required);

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

}
