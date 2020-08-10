import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../account/account.entity';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');

@Injectable()
export class AuthService extends TypeOrmCrudService<Account> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(@InjectRepository(Account) repo, private jwtService: JwtService) {
    super(repo);
  }

  async login(dto: LoginDto): Promise<any> {
    const getUser: any = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (!getUser) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = bcrypt.compareSync(dto.password, getUser.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      sub: getUser.id,
      email: getUser.email,
      username: getUser.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
