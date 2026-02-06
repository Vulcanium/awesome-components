import { Comment } from '../../core/models/comment';

// Entity representing a post in the application.
// Used only within the social-media feature component.
export class Post {
    id!: number
    userId!: number
    title!: string
    createdDate!: string
    imageUrl!: string
    content!: string
    comments!: Comment[]
}