import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/provider";
import { GrantMatchRepository } from "./grant-match.respository";
import { GrantMatchResolver } from "./grant-match.resolver";

@Module({
  imports: [DrizzleModule],
  providers: [GrantMatchRepository, GrantMatchResolver],
  exports: [GrantMatchRepository, GrantMatchResolver],
})
export class GrantMatchModule {}