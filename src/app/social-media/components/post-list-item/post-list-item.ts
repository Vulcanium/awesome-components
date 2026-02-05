import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../models/post';
import { Comments } from "../../../shared/components/comments/comments";

@Component({
  selector: 'app-post-list-item',
  imports: [CommonModule, MatCardModule, Comments],
  templateUrl: './post-list-item.html',
  styleUrl: './post-list-item.scss',
  standalone: true
})
export class PostListItem {

  post: InputSignal<Post> = input.required<Post>();

}
