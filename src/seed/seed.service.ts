import { Injectable, Logger } from "@nestjs/common";
import { Database, InjectDb } from "src/drizzle/provider";
import { NewGrant, NewGrantMatch, grantsTable, tenantsTable, grantMatchTable } from "src/drizzle/schemas";
import { Grant, Tenant } from "src/graphql";

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);

  constructor(
    @InjectDb() private readonly db: Database,
  ) {}

  async seed() {
    this.logger.log('Checking for data');

    const tenants = await this.db.query.tenantsTable.findMany();

    if (!tenants.length) {
      this.logger.log('No data. Seeding...');

      const tenant = await this.seedTenant();
      const grants = await this.seedGrants();

      await this.seedMatches(tenant, grants);

      this.logger.log('Seeding complete');
    } else {
      this.logger.log('Data exists, seeding skipped');
    }
  }

  private async seedTenant() {
    const inserted = await this.db.insert(tenantsTable)
      .values({})
      .returning();

    return inserted[0];
  }

  private async seedGrants() {
    return await this.db.insert(grantsTable)
      .values([
        { name: 'Robinson Foundation Grant', averageAmount: 25000 },
        { name: 'Looking Out', averageAmount: 10000 },
        { name: 'Dribble Foundation Grant', averageAmount: 75000 },
        { name: 'Wakli wako Foundation Grant', averageAmount: 130000 },
        { name: 'Alastair Foundation', averageAmount: 1000000 },
        { name: 'Zotos Foundation', averageAmount: 2000000 },
      ] as NewGrant[])
      .returning();
  }

  private async seedMatches(tenant: Tenant, grants: Grant[]) {
    await this.db.insert(grantMatchTable)
      .values(
        grants.map((grant) => ({
          tenantId: tenant.id,
          grantId: grant.id,
        }) as NewGrantMatch)
      )
  }
}
