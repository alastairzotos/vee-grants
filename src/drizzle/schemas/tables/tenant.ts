import { pgTable } from "drizzle-orm/pg-core";
import { DoesExtend, commonColumns } from "./common";
import { Tenant } from "src/graphql";
import { InferSelectModel } from "drizzle-orm";

export const tenantsTable = pgTable('tenants', {
  ...commonColumns,
});

// Trick to ensure drizzle and graphql schemas are compatible
type TypeCheck = DoesExtend<Tenant, InferSelectModel<typeof tenantsTable>>;
