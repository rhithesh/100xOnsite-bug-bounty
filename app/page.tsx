//@ts-nocheck
"use client";

import TodoForm from "../component/TodoForm";
import TodoList from "../component/TodoList";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const [load, setlaoding] = useState(false);
  const addTodo = (text) => {
    const newTodo = {
      id: Math.random(),
      text,
      completed: false,
    };
    console.log(newTodo);
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      return updatedTodos;
    });

    console.log(todos);
  };

  const toggleComplete = (id) => {
    console.log(id);
    // Toggle the completed status
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      }),
    );

    setlaoding((load) => {
      return !load;
    });

    // After a delay, remove the todo
    setTimeout(() => {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => {
          return todo.id !== id;
        }),
      );
      setlaoding(false);
    }, 3000); // 1-second delay
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  return (
    <div className=" h-screen  w-screen mx-auto px-4 bg-zinc-100 py-8">
      <div className="mx-11">
        <div className=" flex justify-between ">
          <h1 class="text-3xl font-bold mb-6 ">Todo List</h1>
          <h1>{load ? "loading" : ""}</h1>
        </div>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}
