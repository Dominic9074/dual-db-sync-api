export type userRole='user' | 'admin';

export interface User{
    id:string,
    email:string,
    password:string,
    role:userRole,
    createdAt:Date,
    updatedAt:Date,
}