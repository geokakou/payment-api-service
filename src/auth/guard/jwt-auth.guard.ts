import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenError, TokenExpired } from 'src/request.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: Error) {
        if (err || !user) {
            if (info.name === 'TokenExpiredError'){
                throw new TokenExpired();
            }
            throw new TokenError();
        }
        return user;
      }
}

