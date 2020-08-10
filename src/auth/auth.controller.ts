import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
@ApiBearerAuth()
export class AuthController {
  constructor(public service: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<any> {
    try {
      return this.service.login(dto);
    } catch (err) {
      throw new HttpException(
        err.message || err,
        err.statusCode || err.status || 500,
      );
    }
  }
}
