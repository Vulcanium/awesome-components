import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Post } from "../models/post";
import { PostCommented } from "../models/post-commented";

@Injectable()
export class PostsService {
    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }

    addNewComment(postCommented: PostCommented): void {
        console.log(postCommented);
    }
}