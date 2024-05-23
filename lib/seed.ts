import { NewTask, TasksTable, poolConnection, db } from '@/lib/drizzle';
import { UsersTable, NewUser } from './drizzle';

const newUsers: NewUser[] = [
  {
    fullName: 'Pedro Figueiredo',
  },
  {
    fullName: 'John Travolta',
  },
];

const newTasks: NewTask[] = [
  {
    title: 'laundry',
    description: 'Do the laundry',
  },
  {
    title: 'dishes',
    description: 'Do the dishes',
  },
];

export async function seed() {
  const insertedUsers = await db.insert(UsersTable).values(newUsers);

  const insertedTasks = await db
    .insert(TasksTable)
    .values(newTasks.map((t) => ({ ...t, userId: insertedUsers[0].insertId })));

  console.log(`Seeded ${insertedUsers.length} users`);
  console.log(`Seeded ${insertedTasks.length} tasks`);

  poolConnection.end();
}

await seed();
