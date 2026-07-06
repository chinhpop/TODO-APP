import { Todo } from "../models/todo.model.js";
import { isDatabaseReady } from "../config/db.js";

const fallbackTasks = [
  {
    id: "1",
    title: "Review product roadmap and update Q3 milestones",
    completed: false,
    createdAt: new Date("2026-07-06T09:15:00.000Z").toISOString(),
  },
  {
    id: "2",
    title: "Schedule team retrospective meeting",
    completed: true,
    createdAt: new Date("2026-07-04T14:30:00.000Z").toISOString(),
  },
];

let memoryTasks = fallbackTasks.map((task) => ({ ...task }));

function toTaskShape(task) {
  const raw = task.toObject ? task.toObject() : task;
  return {
    id: raw._id ? String(raw._id) : raw.id,
    title: raw.title,
    completed: Boolean(raw.completed),
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : new Date().toISOString(),
  };
}

export class TodoRepository {
  async create(input) {
    if (!isDatabaseReady()) {
      const task = {
        id: String(Date.now()),
        title: input.title,
        completed: Boolean(input.completed),
        createdAt: new Date().toISOString(),
      };
      memoryTasks = [task, ...memoryTasks];
      return task;
    }

    return Todo.create(input);
  }

  async list({ page = 1, limit = 10, search = "", completed, sort = "desc" } = {}) {
    if (!isDatabaseReady()) {
      const filtered = memoryTasks.filter((todo) => {
        const matchCompleted = completed === undefined || todo.completed === completed;
        const matchSearch = !search || todo.title.toLowerCase().includes(search.toLowerCase());
        return matchCompleted && matchSearch;
      });

      const sorted = filtered.sort((left, right) => {
        const leftDate = new Date(left.createdAt).getTime();
        const rightDate = new Date(right.createdAt).getTime();
        return sort === "asc" ? leftDate - rightDate : rightDate - leftDate;
      });

      const start = (page - 1) * limit;
      return {
        items: sorted.slice(start, start + limit).map(toTaskShape),
        total: sorted.length,
        page,
        limit,
      };
    }

    const query = {};

    if (typeof completed === "boolean") {
      query.completed = completed;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Todo.find(query)
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      Todo.countDocuments(query),
    ]);

    return { items: items.map(toTaskShape), total, page, limit };
  }

  async getById(id) {
    if (!isDatabaseReady()) {
      return memoryTasks.find((todo) => todo.id === id) || null;
    }

    return Todo.findById(id);
  }

  async updateById(id, patch) {
    if (!isDatabaseReady()) {
      const todo = memoryTasks.find((item) => item.id === id);
      if (!todo) return null;
      const updated = { ...todo, ...patch };
      memoryTasks = memoryTasks.map((item) => (item.id === id ? updated : item));
      return updated;
    }

    return Todo.findByIdAndUpdate(id, patch, { new: true, runValidators: true });
  }

  async deleteById(id) {
    if (!isDatabaseReady()) {
      const todo = memoryTasks.find((item) => item.id === id);
      if (!todo) return null;
      memoryTasks = memoryTasks.filter((item) => item.id !== id);
      return todo;
    }

    return Todo.findByIdAndDelete(id);
  }
}
