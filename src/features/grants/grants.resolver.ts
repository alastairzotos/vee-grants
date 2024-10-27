import { Query, Resolver } from '@nestjs/graphql';
import { GrantsRepository } from './grants.repository';
import { Grant } from 'src/graphql';

@Resolver(() => Grant)
export class GrantsResolver {
  constructor(
    private readonly grantsRepo: GrantsRepository,
  ) {}

  @Query('grants')
  async grants() {
    return await this.grantsRepo.getGrants();
  }
}
