import { pgEnum, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { tenantsTable } from "./tenant";
import { grantsTable } from "./grant";

const responseEnum = ['open', 'accepted', 'rejected'] as const;
export const tenantGrantReponseEnum = pgEnum('tenant_grant_response', responseEnum);

export type MatchResponseType = typeof responseEnum[number];

export const grantMatchTable = pgTable('grant_matches', {
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenantsTable.id),
  grantId: uuid('grant_id')
    .notNull()
    .references(() => grantsTable.id),

  feedback: text('feedback'),
  response: tenantGrantReponseEnum('response').default('open'),
}, (table) => ({
  pk: primaryKey({ columns: [table.tenantId, table.grantId] }),
}));

export type NewGrantMatch = typeof grantMatchTable.$inferInsert;
export type UpdateGrantMatch = typeof grantMatchTable.$inferSelect;
