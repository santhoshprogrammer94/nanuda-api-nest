import Debug from 'debug';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_USER, NANUDA_USER } from '../../shared';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { basename } from 'path';

const debug = Debug(`app:${basename(__dirname)}: ${basename(__filename)}`);

@Injectable()
export class AuthRolesGuard extends AuthGuard('jwt') {
  readonly roles: (ADMIN_USER | NANUDA_USER)[];

  constructor(...roles: (ADMIN_USER | NANUDA_USER)[]) {
    super();
    this.roles = roles;
  }

  handleRequest(err, user, info, context: ExecutionContextHost) {
    if (err || !user) {
      debug(info);
      throw err ||
        new UnauthorizedException({
          message: '권한이 없습니다.',
          error: 401,
        });
    }

    if (this.roles.length) {
      console.log(this.roles);
      const newArray = [];
      const arrayedRoles = user.authCode.split(',');
      arrayedRoles.map(levels => newArray.push(levels));
      const hasRoles = () => this.roles.some(role => newArray.includes(role));

      if (!user || !hasRoles()) {
        throw new ForbiddenException({
          message: '죄송합니다. 권한이 없습니다.',
          error: 403,
        });
      }
    }
    return user;
  }
}
