import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Comments } from "../../../shared/components/comments/comments";
import { Post } from '../../models/post';
import { PostCommented } from '../../models/post-commented';

@Component({
  selector: 'app-post-list-item',
  imports: [CommonModule, MatCardModule, Comments],
  templateUrl: './post-list-item.html',
  styleUrl: './post-list-item.scss',
  standalone: true
})
export class PostListItem {

  post: InputSignal<Post> = input.required<Post>();
  postCommented: OutputEmitterRef<PostCommented> = output<PostCommented>();

  onNewComment(comment: string): void {
    const postCommentedToEmit = new PostCommented();
    postCommentedToEmit.postId = this.post().id;
    postCommentedToEmit.comment = comment;

    this.postCommented.emit(postCommentedToEmit);
  }

}
