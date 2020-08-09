import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService extends TypeOrmCrudService<Account> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(@InjectRepository(Account) repo) {
    super(repo);
  }
}
