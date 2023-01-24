import type { NextPage } from 'next';
import { AddTodoForm } from '../components/AddTodoForm';
import { TodoItem } from '../components/TodoItem';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading, isError, error } = trpc.todos.getAllTodos.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-8 md:px-0">
      <h1 className="pb-6 text-3xl font-bold text-rose-500">Todo List App</h1>
      <AddTodoForm />
      {data?.todos.length > 0 && (
        <div className="py-3">
          <h3 className="py-2 text-2xl font-semibold text-zinc-400">
            On the list
          </h3>
          <ul>
            {data?.todos?.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </ul>
        </div>
      )}
      {data?.completed.length > 0 && (
        <div className="py-3">
          <h3 className="py-2 text-2xl font-semibold text-zinc-400">
            Completed todos
          </h3>
          <ul>
            {data?.completed?.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default Home;
