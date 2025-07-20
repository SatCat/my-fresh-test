// data/todos.ts
import { join } from "$std/path/mod.ts";

const FILE = join(Deno.cwd(), "data", "todos.json");

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export async function getTodos(): Promise<Todo[]> {
  try {
    const raw = await Deno.readTextFile(FILE);
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveTodos(todos: Todo[]) {
  await Deno.mkdir("data", { recursive: true });
  await Deno.writeTextFile(FILE, JSON.stringify(todos, null, 2));
}