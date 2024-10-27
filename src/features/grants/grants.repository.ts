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
}
