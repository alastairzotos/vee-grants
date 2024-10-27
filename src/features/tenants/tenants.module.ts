import { Module } from "@nestjs/common";
import { TenantsRepository } from "./tenants.repository";
import { TenantsResolver } from "./tenants.resolver";
import { DrizzleModule } from "src/drizzle/provider";
import { GrantMatchModule } from "../grant-matches/grant-match.module";

@Module({
  imports: [
    DrizzleModule,
    GrantMatchModule,
  ],
  providers: [TenantsRepository, TenantsResolver],
})
export class TenantsModule {}
