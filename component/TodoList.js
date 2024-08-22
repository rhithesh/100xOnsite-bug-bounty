import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggleComplete, onDelete }) => {
  return (
    (todos && todos.length > 0) ? (
      <ul className="list-none p-0">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    ) : <div />
  );
};

export default TodoList;
