// Entity representing a candidate in the application.
// Used only within the reactive-state feature component.
export class Candidate {
    id!: number
    firstName!: string
    lastName!: string
    email!: string
    job!: string
    department!: string
    company!: string
    imageUrl!: string
}