import { Routes } from '@angular/router';
import { postsResolver } from './resolvers/posts.resolver';
import { PostsService } from './services/posts.service';

export const SOCIAL_MEDIA_ROUTES: Routes = [
    {
        path: '', // Equivalent to 'social-media'
        loadComponent: () => import('./components/post-list/post-list').then(component => component.PostList),
        providers: [PostsService],
        resolve: { posts: postsResolver }
    }
];
