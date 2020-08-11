import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, ForgotDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Account } from '../account/account.entity';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(public service: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<any> {
    try {
      return this.service.login(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/register')
  async register(@Body() dto: Account): Promise<any> {
    try {
      return this.service.register(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() dto: ForgotDto): Promise<any> {
    try {
      return this.service.forgotPassword(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
