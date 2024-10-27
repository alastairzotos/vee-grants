import { Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { Database, InjectDb } from "src/drizzle/provider";
import { MatchResponseType, UpdateGrantMatch, grantMatchTable } from "src/drizzle/schemas";

@Injectable()
export class GrantMatchRepository {
  constructor(
    @InjectDb() private readonly db: Database,
  ) {}

  async grantMatches(tenantId: string, response: MatchResponseType) {
    return await this.db.query.grantMatchTable.findMany({
      where: (t, { eq, and }) => and(eq(t.tenantId, tenantId), eq(t.response, response)),
      with: { grant: true }
    });
  }

  async respond(tenantId: string, grantId: string, feedback: string, response: MatchResponseType) {
    const result = await this.db.update(grantMatchTable)
      .set({ feedback, response } as UpdateGrantMatch)
      .where(and(eq(grantMatchTable.tenantId, tenantId), eq(grantMatchTable.grantId, grantId)))
      .returning();

    return result[0];
  }
}