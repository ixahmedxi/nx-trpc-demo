import type { FC } from 'react';
import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { RouterOutput } from '../utils/trpc';
import { trpc } from '../utils/trpc';

type TodoItemProps = RouterOutput['todos']['getTodo'];

export const TodoItem: FC<TodoItemProps> = ({ id, title, completed }) => {
  const utils = trpc.useContext();

  const [todoEdit, setTodoEdit] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const { mutate } = trpc.todos.toggleTodo.useMutation({
    onSuccess() {
      void utils.todos.getAllTodos.invalidate();
    },
  });

  const { mutate: editTodo } = trpc.todos.editTodo.useMutation({
    onSuccess() {
      void utils.todos.getAllTodos.invalidate();
    },
  });

  const { mutate: deleteTodo } = trpc.todos.deleteTodo.useMutation({
    onSuccess() {
      void utils.todos.getAllTodos.invalidate();
    },
  });

  return (
    <li className="flex gap-3 items-center justify-between">
      <div className="flex gap-3 flex-1">
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
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              setTodoEdit(false);
              editTodo({
                id,
                title: editedTitle,
              });
            }}
          >
            <input
              type="text"
              value={editedTitle}
              autoFocus
              onChange={(e) => setEditedTitle(e.target.value)}
              className="bg-transparent outline-none w-full py-1"
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
