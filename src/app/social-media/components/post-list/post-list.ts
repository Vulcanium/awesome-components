import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { PostCommented } from '../../models/post-commented';
import { PostsService } from '../../services/posts.service';
import { PostListItem } from "../post-list-item/post-list-item";

@Component({
  selector: 'app-post-list',
  imports: [PostListItem],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
  standalone: true
})
export class PostList implements OnInit {

  posts!: WritableSignal<Post[]>;

  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts = signal(this.route.snapshot.data['posts']);
  }

  onPostCommented(postCommented: PostCommented): void {
    this.postsService.addNewComment(postCommented);
  }

}
