import fastify from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { TreatedError } from './errors/TreatedError';

export const app = fastify();

void app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error', issues: error.format() });
    }

    if (error instanceof TreatedError) {
        return reply.status(error.statusCode).send({ message: error.message });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return reply.status(500).send({ message: 'Internal server error' });
});
