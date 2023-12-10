import { type FastifyInstance } from 'fastify';
import { create } from './controllers/UserController';

export async function appRoutes(app: FastifyInstance): Promise<void> {
    app.post('/users', create);
}
