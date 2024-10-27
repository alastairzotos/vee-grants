
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { DoesExtend, commonColumns } from "./common";
import { InferSelectModel } from "drizzle-orm";
import { Grant } from "src/graphql";

export const grantsTable = pgTable('grants', {
  ...commonColumns,

  name: varchar('name', { length: 255 }).notNull().unique(),
  averageAmount: integer('average_amount').notNull(),

  // Add extra columns here
});

export type NewGrant = typeof grantsTable.$inferInsert;

// Trick to ensure drizzle and graphql schemas are compatible
type TypeCheck = DoesExtend<Grant, InferSelectModel<typeof grantsTable>>;