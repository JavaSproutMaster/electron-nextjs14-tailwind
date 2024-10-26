"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodoContextType = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleTodoCompleted: (id: string) => void;
  handleTodoDelete: (id: string) => void;
  handleSelectAll: () => void;
  handleDeleteAll: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const newTodos =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("todos") || "[]"
        : "[]";
    return JSON.parse(newTodos) as Todo[];
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectAll = () => {
    setTodos((prev) => {
      const reversedTodos = prev.every((task) => task.completed);
      const updatedTodos = prev.map((task) => ({
        ...task,
        completed: !reversedTodos,
      }));
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleDeleteAll = () => {
    setTodos((prev) => {
      const deleteTodo = prev.filter((task) => !task.completed);
      localStorage.setItem("todos", JSON.stringify(deleteTodo));
      return deleteTodo;
    });
  };

  //task add, update, delete methods are defined here

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };
  const toggleTodoCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) return { ...task, completed: !task.completed };
        return task;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleTodoDelete = (id: string) => {
    setTodos((prev) => {
      const deleteTodo = prev.filter((task) => task.id !== id);
      localStorage.setItem("todos", JSON.stringify(deleteTodo));
      return deleteTodo;
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleAddTodo,
        toggleTodoCompleted,
        handleTodoDelete,
        handleSelectAll,
        handleDeleteAll,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodos() {
  const todosContextValue = useContext(TodoContext);
  if (!todosContextValue) {
    throw new Error("useTodos used outside of provider");
  }
  return todosContextValue;
}
