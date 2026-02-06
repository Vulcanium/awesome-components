import { animate, animateChild, group, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Comment } from '../../../core/models/comment';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';
import { TimeAgoPipe } from "../../pipes/time-ago.pipe";

@Component({
  selector: 'app-comments',
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TimeAgoPipe],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  standalone: true,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [stagger('100ms', animateChild())])
      ])
    ]),
    trigger('listItem', [
      state('default', style({ transform: 'scale(1)', 'background-color': 'white', 'z-index': 1 })),
      state('active', style({ transform: 'scale(1.05)', 'background-color': 'rgb(201, 157, 242)', 'z-index': 2 })),
      transition('default => active', [animate('100ms ease-in-out')]),
      transition('active => default', [animate('500ms ease-in-out')]),
      transition(':enter', [
        query('.comment-text, .comment-date', [style({ opacity: 0 })]),
        useAnimation(slideAndFadeAnimation, { params: { time: '250ms', color: 'rgb(201, 157, 242)' } }),
        group([
          query('.comment-text', [animate('250ms'), style({ opacity: 1 })]),
          query('.comment-date', [animate('500ms'), style({ opacity: 1 })])
        ])
      ])
    ])
  ]
})
export class Comments implements OnInit {

  // Input and Output signals to communicate with the parent component
  comments: InputSignal<Comment[]> = input.required<Comment[]>();
  newComment: OutputEmitterRef<string> = output<string>();

  // Field of the reactive form
  commentControl!: FormControl;

  // Dictionary-type signal to communicate the new state of each animations
  animationStates: WritableSignal<{ [key: number]: 'default' | 'active' }> = signal({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initCommentControl();
    this.initAnimationStates();
  }

  initCommentControl(): void {
    this.commentControl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }

  initAnimationStates(): void {
    for (let index in this.comments()) { // Equivalent to: for(let i=0; i<this.comments().length; i++)
      this.animationStates()[index] = 'default';
    }
  }

  onLeaveComment(): void {
    if (this.commentControl.invalid) {
      return;
    }

    this.newComment.emit(this.commentControl.value);
    this.commentControl.reset();
  }

  onListItemMouseEnter(index: number): void {
    this.animationStates()[index] = 'active';
  }

  onListItemMouseLeave(index: number): void {
    this.animationStates()[index] = 'default';
  }

}
