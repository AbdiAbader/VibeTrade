export interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface UserResponse {
    users: User[],
}
