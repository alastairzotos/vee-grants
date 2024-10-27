import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { GrantMatch } from "src/graphql";
import { GrantMatchRepository } from "./grant-match.respository";
import { MatchResponseType } from "src/drizzle/schemas";

@Resolver(() => GrantMatch)
export class GrantMatchResolver {
  constructor(
    private readonly grantMatchRepo: GrantMatchRepository,
  ) {}

  @Mutation(() => GrantMatch)
  async respond(
    @Args('tenantId') tenantId: string,
    @Args('grantId') grantId: string,
    @Args('feedback') feedback: string,
    @Args('response') response: MatchResponseType,
  ) {
    return await this.grantMatchRepo.respond(tenantId, grantId, feedback, response);
  }
}