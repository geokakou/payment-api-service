import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async createToken(user: User) {
        const payload = { username: user.username, sub: user.password };
        const expireDate: Date = new Date(Date.now() + Number(jwtConstants.expiresInMS))
        return {
            authToken: this.jwtService.sign(payload, { expiresIn: jwtConstants.expiresInMS }),
            expiresIn: expireDate
        };
      }
}
