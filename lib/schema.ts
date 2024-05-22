import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTable,
  varchar,
} from 'drizzle-orm/mysql-core';

export const UsersTable = mysqlTable(
  'users',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    fullName: varchar('full_name', { length: 256 }),
  },
  (users) => ({
    nameIdx: index('name_idx').on(users.fullName),
  })
);

export const TasksTable = mysqlTable('tasks', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  userId: bigint('user_id', { mode: 'number' }),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 256 }),
  done: boolean('done').default(false),
});

//👇 This code block will tell Drizzle that users & tasks are related!
export const usersRelations = relations(UsersTable, ({ many }) => ({
  tasks: many(TasksTable),
}));

//👇 This code block defines which columns in the two tables are related
export const tasksRelations = relations(TasksTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [TasksTable.userId],
    references: [UsersTable.id],
  }),
}));

export type User = InferSelectModel<typeof UsersTable>;
export type NewUser = InferInsertModel<typeof UsersTable>;

export type Task = InferSelectModel<typeof TasksTable>;
export type NewTask = InferInsertModel<typeof TasksTable>;
