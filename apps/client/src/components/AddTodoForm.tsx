import type { FormEvent} from 'react';
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

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ title: todo });
    setTodo('');
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex justify-between rounded-md border-2 border-zinc-100 dark:border-zinc-800"
    >
      <input
        type="text"
        value={todo}
        placeholder="Your new task..."
        onChange={(e) => setTodo(e.target.value)}
        className="flex-1 bg-transparent py-2 px-4 outline-none"
      />
      <button
        type="submit"
        className="rounded-r-md bg-rose-500 px-4 font-semibold"
      >
        Add todo
      </button>
    </form>
  );
};
