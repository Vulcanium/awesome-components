import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-complex-form',
  imports: [MatCheckboxModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatAnchor],
  templateUrl: './complex-form.html',
  styleUrl: './complex-form.scss',
  standalone: true
})
export class ComplexForm implements OnInit {

  mainForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initMainForm();
  }

  initMainForm(): void {
    this.mainForm = this.formBuilder.group({});
  }

  onSubmitForm(): void {
    throw new Error('Method not implemented.');
  }

}
