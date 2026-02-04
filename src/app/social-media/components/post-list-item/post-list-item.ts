import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list-item',
  imports: [CommonModule],
  templateUrl: './post-list-item.html',
  styleUrl: './post-list-item.scss',
  standalone: true
})
export class PostListItem {

  @Input() post!: Post;

}
