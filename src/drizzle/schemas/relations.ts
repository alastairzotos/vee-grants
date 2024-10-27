import { relations } from 'drizzle-orm';
import { grantsTable, tenantsTable } from './tables';
import { grantMatchTable } from './tables/grant-match';

export const tenantsRelations = relations(tenantsTable, ({ many }) => ({
  tenantToGrants: many(grantMatchTable),
}));

export const grantMatchTableRelations = relations(grantMatchTable, ({ one }) => ({
  tenant: one(tenantsTable, {
    fields: [grantMatchTable.tenantId],
    references: [tenantsTable.id],
  }),
  grant: one(grantsTable, {
    fields: [grantMatchTable.grantId],
    references: [grantsTable.id],
  })
}));
