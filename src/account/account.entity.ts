import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from '../base.entity';
import uuid = require('uuid');
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsEmail } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('accounts')
export class Account extends BaseEntity {
  @ApiPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  firstname: string;

  @ApiPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  lastname: string;

  @ApiPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  username: string;

  @ApiPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsEmail()
  @Column({ type: 'varchar' })
  email: string;

  @ApiPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsEmail()
  @Column({ type: 'varchar' })
  password: string;

  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @Column({ type: 'varchar' })
  picture: string;

  @ApiPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'simple-array' })
  roles: string[];

  @BeforeInsert()
  protected async hashPassword(): Promise<any> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = uuid.v4();
  }
}
