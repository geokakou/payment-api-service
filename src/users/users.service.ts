import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            username: 'george',
            password: 'pass1234'
        }
    ];
  
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
