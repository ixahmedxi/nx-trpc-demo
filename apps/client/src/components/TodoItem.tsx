import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import type { RouterOutput } from '../utils/trpc';
import { trpc } from '../utils/trpc';

type TodoItemProps = RouterOutput['todos']['getAllTodos']['todos'][0];

export const TodoItem: FC<TodoItemProps> = ({ id, title, completed }) => {
  const utils = trpc.useContext();

  const [todoEdit, setTodoEdit] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const { mutate } = trpc.todos.toggleTodo.useMutation({
    onSuccess() {
      void utils.todos.getAllTodos.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  const { mutate: editTodo } = trpc.todos.editTodo.useMutation({
    onSuccess() {
      void utils.todos.getAllTodos.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  const { mutate: deleteTodo } = trpc.todos.deleteTodo.useMutation({
    onSuccess() {
      void utils.todos.getAllTodos.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  const onFormEditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoEdit(false);
    editTodo({
      id,
      title: editedTitle,
    });
  };

  return (
    <li className="flex items-center justify-between gap-3">
      <div className="flex flex-1 gap-3">
        <input
          type="checkbox"
          checked={completed}
          onClick={() => mutate({ id })}
        />
        {!todoEdit && (
          <span
            className="select-none py-1"
            onDoubleClick={() => setTodoEdit(!todoEdit)}
          >
            {title}
          </span>
        )}
        {todoEdit && (
          <form className="flex-1" onSubmit={onFormEditSubmit}>
            <input
              type="text"
              value={editedTitle}
              autoFocus
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-transparent py-1 outline-none"
            />
          </form>
        )}
      </div>
      <button onClick={() => deleteTodo({ id })}>
        <FiTrash2 size={18} />
      </button>
    </li>
  );
};
