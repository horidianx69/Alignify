export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TaskPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

// const task: TaskDocument = {
//   title: "Fix bug",
//   status: "todoo", // ❌ error — "todoo" not allowed
//   priority: "medium", // ❌ error — must be "MEDIUM"
// }; compile time pe hi error dikhayega ye or reusability badhata hai and autocomplete bhi deta hai
