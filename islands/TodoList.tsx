// islands/TodoList.tsx
import { useSignal } from "@preact/signals";
import { Todo } from "../data/todos.ts";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos: initial }: Props) {
  const todos = useSignal(initial);

  async function toggle(id: string) {
    await fetch(`/api/todos/${id}`, { method: "PATCH" });
    todos.value = todos.value.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
  }

  async function remove(id: string) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  return (
    <ul class="space-y-2">
      {todos.value.map((t) => (
        <li key={t.id} class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => toggle(t.id)}
            class="cursor-pointer"
          />
          <span class={t.done ? "line-through text-gray-500" : ""}>
            {t.text}
          </span>
          <button
            onClick={() => remove(t.id)}
            class="ml-auto text-red-500 text-sm"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}