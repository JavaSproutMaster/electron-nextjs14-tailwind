"use client"
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTodos } from "../context/todo";

type Props = {};

const TodosMessage = (props: Props) => {
  const {
    todos,
    toggleTodoCompleted,
    handleTodoDelete,
    handleSelectAll,
    handleDeleteAll,
  } = useTodos();

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");

  useEffect(() => {
    let newFilteredTodos = todos;
    console.log(' ******************************** here is todo from context ********************************');
    console.log(todos);
    if (todosFilter === "active") {
      newFilteredTodos = todos.filter((todo) => !todo.completed);
    } else if (todosFilter === "completed") {
      newFilteredTodos = todos.filter((todo) => todo.completed);
    }

    setFilteredTodos(newFilteredTodos);
  }, [todos, todosFilter]);

  return (
    <section>
      <div className="flex justify-between text-black  font-semibold font-mono px-6">
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
      <ul className="flex flex-col justify-center items-center">
        {filteredTodos.length ? (
          filteredTodos.map((todos) => (
            <li
              key={todos.id}
              className="min-h-[4rem] w-full px-6 grid grid-cols-3 items-center border-y border-gray-600 my-3"
            >
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer justify-self-start"
                id={`todo-${todos.id}`}
                checked={todos.completed}
                onChange={() => toggleTodoCompleted(todos.id)}
              />
              <label
                htmlFor={`todo-${todos.id}`}
                className={` ${
                  todos.completed ? "line-through text-red-600 " : ""
                } justify-self-start`}
              >
                {todos.task}
              </label>
              {todos.completed ? (
                <button
                  className="p-2 text-sm w-28 inline-block rounded-full text-white bg-blue-600 hover:bg-blue-600 justify-self-end"
                  onClick={() => handleTodoDelete(todos.id)}
                >
                  Delete Task
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <li>No Items Found</li>
        )}
      </ul>
    </section>
  );
};

export default TodosMessage;
