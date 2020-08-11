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

  async register(dto: Partial<Account>): Promise<any> {
    const checkEmail: boolean = await this.areEmailExist(dto.email);
    const checkUsername: boolean = await this.areUsernameExist(dto.username);

    if (!checkEmail && !checkUsername) {
      const createAccount = await this.repo.create(dto);
      const saveAccount = await this.repo.save(createAccount);

      if (saveAccount) {
        throw new HttpException('Success', HttpStatus.OK);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async areEmailExist(dto: string): Promise<any> {
    const areEmailExist = await this.repo.findOne({
      where: { email: dto },
    });

    if (!areEmailExist) {
      return false;
    }

    throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
  }

  async areUsernameExist(dto: string): Promise<any> {
    const areUsernameExist = await this.repo.findOne({
      where: { username: dto },
    });

    if (!areUsernameExist) {
      return false;
    }

    throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST);
  }
}
