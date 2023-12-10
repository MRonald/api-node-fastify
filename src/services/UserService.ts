import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import { type UserRepositoryInterface } from '@/repositories/interfaces/UserRepositoryInterface';
import { hash } from 'bcryptjs';

interface UserDTO {
    name: string;
    email: string;
    password: string;
}

export class UserService {
    constructor(private readonly userRepository: UserRepositoryInterface) {}

    async create({ name, email, password }: UserDTO): Promise<void> {
        const passwordHash = await hash(password, 6);

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }

        await this.userRepository.create({
            name,
            email,
            password: passwordHash,
        });
    }
}
