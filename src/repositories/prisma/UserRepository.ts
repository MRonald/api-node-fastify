import { type UserRepositoryInterface } from '../interfaces/UserRepositoryInterface';
import { prisma } from './../../lib/prisma';
import { type Prisma, type User } from '@prisma/client';

export class UserRepository implements UserRepositoryInterface {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async create({
        name,
        email,
        password,
    }: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        return user;
    }
}
