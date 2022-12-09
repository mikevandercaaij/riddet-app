# Riddet
This project was pade as part of the "Clientside web frameworks" course of Avans Hogeschool Breda. 

## Case
The thought behind this app is pretty much to make an application that resamples the core functionality of Reddit. This basically means users will be able to create their own account. With this account they'll be able to create their own communities, but also take part in other people their repositories. Within these repositories joined members will be able to make threads, comment on these threads, leave likes, but overall interact with other members.

But what can people do outside of all these fun communities and what's next? Users will be able to follow eachother, see who they follow and get certain recommendations. The way these recommendations will work is that the backend will keep track of what other people do. For example: what they like, whom they follow or even what they comment on.
## Entities
All entities that have been integrated within all used repositories for this project are listed down below.

### User
- _id: ObjectId
- username: string
- firstName: string
- lastName: string
- email: string
- dateOfBirth: Date
- password: string
- userImageUrl: string
- creationDate: Date
- isActive: boolean
- roles: Role[] (enum van rollen)
- joinedCommunities: ObjectId[]
- createdCommunities: ObjectId[]
- following: ObjectId[]
- followers: ObjectId[]

### User
- _id: ObjectId
- name: string
- description: string
- creationDate: Date
- imageUrl: string
- isPublic: boolean
- categories: Category[]
- participants: ObjectId[]
- threads: Thread[]
- createdBy: User

### Community
- _id: ObjectId
- text: string
- likes: ObjectId[]
- dislikes: Date
- publicationDate: Date
- createdBy: Object

### Thread
- _id: ObjectId
- title: string
- content: string
- imageUrl: string
- views: number
- externLink: string
- upvotes: ObjectId[]
- publicationDate: Date
- messages: Message[]
- createdBy: Objectid

### Category
- _id: ObjectId
- name: string
