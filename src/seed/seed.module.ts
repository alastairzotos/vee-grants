import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/provider";
import { SeedService } from "./seed.service";

@Module({
  imports: [DrizzleModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
