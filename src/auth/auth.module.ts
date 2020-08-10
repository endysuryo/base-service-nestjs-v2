import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/account.entity';
import { JwtModule } from '@nestjs/jwt';
import dotenv = require('dotenv');

const { parsed } = dotenv.config({
  path:
    process.cwd() +
    '/.env' +
    (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''),
});
process.env = { ...process.env, ...parsed };

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],

  providers: [AuthService],

  controllers: [AuthController],
})
export class AuthModule {}
