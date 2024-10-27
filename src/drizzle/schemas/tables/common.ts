import { timestamp, uuid } from 'drizzle-orm/pg-core';

export type DoesExtend<T, U extends T> = U;

export const commonColumns = {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
}
