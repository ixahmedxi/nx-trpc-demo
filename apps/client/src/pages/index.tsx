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
    <main className="max-w-3xl py-8 mx-auto">
      <h1 className="text-rose-500 font-bold text-3xl pb-6">Todo List App</h1>
      <AddTodoForm />
      {data?.todos.length > 0 && (
        <div className="py-3">
          <h3 className="text-2xl font-semibold text-zinc-400 py-2">
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
          <h3 className="text-2xl font-semibold text-zinc-400 py-2">
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
