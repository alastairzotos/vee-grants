
import { Module } from '@nestjs/common';
import { GrantsResolver } from './grants.resolver';
import { GrantsRepository } from './grants.repository';
import { DrizzleModule } from 'src/drizzle/provider';

@Module({
  imports: [DrizzleModule],
  providers: [GrantsRepository, GrantsResolver],
})
export class GrantsModule { }
