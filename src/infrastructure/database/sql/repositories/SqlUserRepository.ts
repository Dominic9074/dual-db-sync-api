import { IUserRepository,CreateUserData } from "../../../../domain/repositories/IuserRepository";

import { User } from "../../../../domain/entities/user";
import { appDataSource } from "../data-source";
import { UserEntity } from "../entities/userEntity";

export class SqlUserRepository implements IUserRepository {
  private readonly repository = appDataSource.getRepository(UserEntity);

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async create(data: CreateUserData): Promise<User> {
    const userEntity = this.repository.create({
      id: crypto.randomUUID(),
      email: data.email,
      password: data.password,
      role: data.role,
    });

    const savedUser = await this.repository.save(userEntity);

    return this.toDomain(savedUser);
  }

  async update(
    id: string,
    data: Partial<User>
  ): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    Object.assign(user, data);

    const updatedUser = await this.repository.save(user);

    return this.toDomain(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);

    return (result.affected ?? 0) > 0;
  }

  private toDomain(user: UserEntity): User {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
