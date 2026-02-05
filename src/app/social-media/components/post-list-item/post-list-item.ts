import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../core/models/user';
import { Comments } from "../../../shared/components/comments/comments";
import { ShortenPipe } from "../../../shared/pipes/shorten.pipe";
import { TimeAgoPipe } from "../../../shared/pipes/time-ago.pipe";
import { UsernamePipe } from "../../../shared/pipes/username.pipe";
import { Post } from '../../models/post';
import { PostCommented } from '../../models/post-commented';

@Component({
  selector: 'app-post-list-item',
  imports: [CommonModule, MatCardModule, Comments, ShortenPipe, UsernamePipe, TimeAgoPipe],
  templateUrl: './post-list-item.html',
  styleUrl: './post-list-item.scss',
  standalone: true
})
export class PostListItem {

  post: InputSignal<Post> = input.required<Post>();
  postCommented: OutputEmitterRef<PostCommented> = output<PostCommented>();

  user: User = { firstName: 'Jean', lastName: 'Passe' };

  onNewComment(comment: string): void {
    const postCommentedToEmit = new PostCommented();
    postCommentedToEmit.postId = this.post().id;
    postCommentedToEmit.comment = comment;

    this.postCommented.emit(postCommentedToEmit);
  }

}
