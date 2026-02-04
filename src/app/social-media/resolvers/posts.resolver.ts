import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { PostsService } from "../services/posts.service";

export const postsResolver: ResolveFn<Post[]> = () => {
    const postsService = inject(PostsService);
    return postsService.getPosts();
};