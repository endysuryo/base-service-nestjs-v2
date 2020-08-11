import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account } from './account.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Crud({
  model: {
    type: Account,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@ApiTags('Accounts')
@Controller('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AccountController implements CrudController<Account> {
  constructor(public service: AccountService) {}

  get base(): CrudController<Account> {
    return this;
  }
}
