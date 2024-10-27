import { Injectable } from "@nestjs/common";
import { Database, InjectDb } from "src/drizzle/provider";

@Injectable()
export class GrantsRepository {
  constructor(
    @InjectDb() private readonly db: Database
  ) {}

  async getGrants() {
    return await this.db.query.grantsTable.findMany();
  }

  async searchGrants(
    name = '',
    minValue = 0,
    maxValue = 1000000000,
  ) {
    return await this.db.query.grantsTable.findMany({
      where: (t, { and, gt, lt, ilike }) => and(
        ilike(t.name, `%${name || ''}%`),
        gt(t.averageAmount, minValue),
        lt(t.averageAmount, maxValue),
      )
    });
  }
}
