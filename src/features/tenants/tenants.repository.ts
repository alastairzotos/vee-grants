import { Injectable } from "@nestjs/common";
import { Database, InjectDb } from "src/drizzle/provider";

@Injectable()
export class TenantsRepository {
  constructor(
    @InjectDb() private readonly db: Database
  ) {}

  async tenants() {
    return await this.db.query.tenantsTable.findMany();
  }

  async tenant(id: string) {
    return await this.db.query.tenantsTable.findFirst({
      where: (t, { eq }) => eq(t.id, id),
    });
  }
}
