import {User, userRole} from '../entities/user'

export interface CreateUserData {
  email: string;
  password: string;
  role: userRole;
}

export interface IUserRepository{
    findById(id:string):Promise<User | null>;

    findByEmail(email:string):Promise<User | null>;

    create(user:CreateUserData):Promise<User>;

    update(id:string,data:Partial<User>):Promise<User | null>;

    delete(id:string):Promise<boolean>;
}

