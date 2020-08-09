import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],

  providers: [AccountService],

  controllers: [AccountController],
})
export class AccountModule {}
