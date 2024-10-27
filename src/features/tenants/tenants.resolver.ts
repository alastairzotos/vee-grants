import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TenantsRepository } from "./tenants.repository";
import { GrantMatch, Tenant } from "src/graphql";
import { GrantMatchRepository } from "../grant-matches/grant-match.respository";

@Resolver(() => Tenant)
export class TenantsResolver {
  constructor(
    private readonly grantMatchRepo: GrantMatchRepository,
    private readonly tenantsRepo: TenantsRepository,
  ) {}

  @Query(() => [Tenant])
  async tenants() {
    return await this.tenantsRepo.tenants();
  }

  @Query(() => Tenant)
  async tenant(@Args('id') id: string) {
    return await this.tenantsRepo.tenant(id);
  }

  @ResolveField('openGrants', () => [GrantMatch])
  async openGrants(@Parent() tenant: Tenant) {
    return await this.grantMatchRepo.grantMatches(tenant.id, 'open');
  }

  @ResolveField('acceptedGrants', () => [GrantMatch])
  async acceptedGrants(@Parent() tenant: Tenant) {
    return await this.grantMatchRepo.grantMatches(tenant.id, 'accepted');
  }

  @ResolveField('rejectedGrants', () => [GrantMatch])
  async rejectedGrants(@Parent() tenant: Tenant) {
    return await this.grantMatchRepo.grantMatches(tenant.id, 'rejected');
  }
}
