// routes/index.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import { getTodos, saveTodos, Todo } from "../data/todos.ts";
import TodoList from "../islands/TodoList.tsx";

export const handler: Handlers<Todo[]> = {
  async GET(_req, ctx) {
    const todos = await getTodos();
    return ctx.render(todos);
  },

  async POST(req) {
    const form = await req.formData();
    const text = form.get("text")?.toString().trim();
    if (!text) return new Response("Bad", { status: 400 });

    const todos = await getTodos();
    todos.push({ id: crypto.randomUUID(), text, done: false });
    await saveTodos(todos);

    return new Response("", { status: 303, headers: { Location: "/" } });
  },
};

export default function Home({ data: todos }: PageProps<Todo[]>) {
  return (
    <div class="p-8 max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-4">Fresh To-Do</h1>

      <form method="post" class="flex gap-2 mb-4">
        <input
          name="text"
          class="border rounded px-2 py-1 flex-1"
          placeholder="Новая задача…"
          required
        />
        <button class="bg-blue-600 text-white px-3 py-1 rounded">+</button>
      </form>

      {/* остров */}
      <TodoList todos={todos} />
    </div>
  );
}