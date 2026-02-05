import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Comment } from '../../../core/models/comment';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  standalone: true
})
export class Comments implements OnInit {

  comments: InputSignal<Comment[]> = input.required<Comment[]>();
  commentControl!: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentControl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }

  onLeaveComment() {
    throw new Error('Method not implemented.');
  }

}
