import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
//table
export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
});
