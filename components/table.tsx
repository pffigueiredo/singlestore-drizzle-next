import { db, Task, TasksTable, User, UsersTable } from '@/lib/drizzle';
import Image from 'next/image';
import RefreshButton from './refresh-button';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function getData() {
  let users;
  let startTime = Date.now();
  try {
    const rows = await db
      .select()
      .from(UsersTable)
      .leftJoin(TasksTable, eq(UsersTable.id, TasksTable.userId))
      .orderBy(UsersTable.id, TasksTable.id);

    // 👇 This code block will group the tasks by user
    users = rows.reduce<Array<{ user: User; tasks: Task[] }>>((acc, row) => {
      const user = row.users;
      const task = row.tasks;

      const existingUser = acc.find((u) => u.user.id === user.id);
      if (existingUser && task) {
        existingUser.tasks.push(task);
      } else {
        acc.push({ user, tasks: task ? [task] : [] });
      }

      return acc;
    }, []);
  } catch (e: any) {
    console.log(e);

    if (e.message === `relation "users" does not exist`) {
      throw new Error(
        'Table does not exist, push the schema by running `npm run db:push-migrations`'
      );
    } else {
      throw e;
    }
  }

  const duration = Date.now() - startTime;

  return { users, duration };
}

async function addTask(formData: FormData) {
  'use server';

  const userId = Number(formData.get('userID'));
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  console.log({ userId, title, description });

  try {
    await db.insert(TasksTable).values({
      userId,
      title,
      description,
    });

    revalidatePath('/');
  } catch (e) {
    throw new Error('Failed to create task');
  }
}

async function updateTask(formData: FormData) {
  'use server';
  const taskID = Number(formData.get('taskID'));
  const done = formData.get('done') === 'true';

  try {
    await db
      .update(TasksTable)
      .set({ done: !done })
      .where(eq(TasksTable.id, taskID));

    revalidatePath('/');
  } catch (e) {
    throw new Error('Failed to create task');
  }
}

async function deleteTask(formData: FormData) {
  'use server';
  const taskID = Number(formData.get('taskID'));

  try {
    await db.delete(TasksTable).where(eq(TasksTable.id, taskID));

    revalidatePath('/');
  } catch (e) {
    throw new Error('Failed to create task');
  }
}

export default async function Table() {
  const { users, duration } = await getData();

  return (
    <div className="w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <p className="text-sm text-gray-500">
            Fetched {users.length} users in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {users.map((user) => (
          <div
            key={user.user.id}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center w-full space-x-4">
              <Image
                src={
                  'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg'
                }
                alt={'avatar'}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="flex justify-between flex-1">
                <div className="space-y-1">
                  <p className="font-medium leading-none">
                    {user.user.fullName}
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Tasks</h3>
                  <ul className="flex flex-col gap-4">
                    {user.tasks.length === 0 ? (
                      <>
                        <p> All Done!</p>
                        <form action={addTask}>
                          <input
                            placeholder="New task title"
                            type="text"
                            name="title"
                          />
                          <input
                            placeholder="New task description"
                            type="text"
                            name="description"
                          />
                          <input
                            type="hidden"
                            name="userID"
                            value={user.user.id}
                          />

                          <button>Add Task</button>
                        </form>
                      </>
                    ) : (
                      user.tasks.map((task) => (
                        <li key={task.id}>
                          <p
                            className="font-medium leading-none"
                            title={task.description ?? ''}
                          >
                            {task.title}
                            {task.done ? '✅' : '❌'}
                          </p>

                          <form action={updateTask}>
                            <input
                              type="hidden"
                              name="done"
                              value={String(task.done ?? false)}
                            />
                            <input
                              type="hidden"
                              name="taskID"
                              value={task.id}
                            />
                            <button className="p-2 bg-slate-200">
                              Update status
                            </button>
                          </form>

                          <form action={deleteTask}>
                            <input
                              type="hidden"
                              name="taskID"
                              value={task.id}
                            />
                            <button>🗑️</button>
                          </form>

                          <form action={addTask}>
                            <input
                              placeholder="New task title"
                              type="text"
                              name="title"
                            />
                            <input
                              placeholder="New task description"
                              type="text"
                              name="description"
                            />
                            <input
                              type="hidden"
                              name="userID"
                              value={user.user.id}
                            />

                            <button>Add Task</button>
                          </form>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
