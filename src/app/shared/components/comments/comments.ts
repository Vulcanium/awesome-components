import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Comment } from '../../../core/models/comment';
import { TimeAgoPipe } from "../../pipes/time-ago.pipe";

@Component({
  selector: 'app-comments',
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TimeAgoPipe],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  standalone: true
})
export class Comments implements OnInit {

  comments: InputSignal<Comment[]> = input.required<Comment[]>();
  newComment: OutputEmitterRef<string> = output<string>();

  commentControl!: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentControl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }

  onLeaveComment(): void {
    if (this.commentControl.invalid) {
      return;
    }

    this.newComment.emit(this.commentControl.value);
    this.commentControl.reset();
  }

}
