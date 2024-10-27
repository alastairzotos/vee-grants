import { Args, Int, Query, Resolver } from '@nestjs/graphql';
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

  @Query('searchGrants')
  async searchGrants(
    @Args('name') name?: string,
    @Args('minValue', { type: () => Int, nullable: true }) minValue?: number,
    @Args('maxValue', { type: () => Int, nullable: true }) maxValue?: number,
  ) {
    return await this.grantsRepo.searchGrants(name, minValue, maxValue);
  }
}
