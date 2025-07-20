// routes/api/todos/[id].ts
import { Handlers } from "$fresh/server.ts";
import { getTodos, saveTodos } from "../../../data/todos.ts";

export const handler: Handlers = {
  async PATCH(req, ctx) {
    const id = ctx.params.id;
    const todos = await getTodos();
    const todo = todos.find((t) => t.id === id);
    if (!todo) return new Response("Not found", { status: 404 });
    todo.done = !todo.done;
    await saveTodos(todos);
    return new Response("OK");
  },

  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    let todos = await getTodos();
    todos = todos.filter((t) => t.id !== id);
    await saveTodos(todos);
    return new Response("OK");
  },
};