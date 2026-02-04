// Entity representing a comment in the application. Imported once (Core component) and used across multiple components.
export class Comment {
    id!: number
    userId!: number
    comment!: string
    createdDate!: string
}