import { useState } from 'react';
import { trpc } from '../utils/trpc';

export const AddTodoForm = () => {
  const utils = trpc.useContext();
  const [todo, setTodo] = useState<string>('');

  const { mutate } = trpc.todos.addTodo.useMutation({
    onSuccess() {
      void utils.todos.getAllTodos.invalidate();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ title: todo });
        setTodo('');
      }}
      className="border-2 dark:border-zinc-800 border-zinc-100 flex justify-between rounded-md"
    >
      <input
        type="text"
        value={todo}
        placeholder="Your new task..."
        onChange={(e) => setTodo(e.target.value)}
        className="bg-transparent outline-none flex-1 py-2 px-4"
      />
      <button
        type="submit"
        className="bg-rose-500 px-4 rounded-r-md font-semibold"
      >
        Add todo
      </button>
    </form>
  );
};
