import { TreatedError } from './TreatedError';

export class UserAlreadyExistsError extends TreatedError {
    constructor(message = 'User already exists', statusCode = 409) {
        super(message, statusCode);
    }
}
