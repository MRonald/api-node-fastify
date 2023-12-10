import { UserRepository } from '@/repositories/prisma/UserRepository';
import { UserService } from '@/services/UserService';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(
    request: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply> {
    const createSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = createSchema.parse(request.body);

    const userRepository = new UserRepository();

    const userService = new UserService(userRepository);

    await userService.create({
        name,
        email,
        password,
    });

    return await reply.status(201).send();
}
