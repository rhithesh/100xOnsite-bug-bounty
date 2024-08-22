"use client";

import TodoForm from "../component/TodoForm";
import TodoList from "../component/TodoList";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        }
      } catch (error) {
        console.error("Error parsing stored todos:", error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change, but only if not an empty array
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos"); // Clear localStorage if todos is empty
    }
  }, [todos]);

  // Add a new todo
  const addTodo = (text: string) => {
    if (text.trim().length === 0) return; // Prevent adding empty todos
    const newTodo: Todo = {
      id: Math.random(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle completion status of a todo
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
        />
      ) : (
        <p>No todos yet. Add one above!</p>
      )}
    </div>
  );
}
