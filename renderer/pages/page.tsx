"use client"
import type { NextPage } from "next";
import { Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
const AddTodo = lazy(() => import("../components/AddTodo"));
const TodosMessage = lazy(() => import("../components/TodosMessage"));

import { Inter } from "next/font/google";
import { TodoProvider } from "../context/todo";

const Toaster = lazy(() => import("../components/ui/toaster"));
import { LogoutContainer } from "../components/logout-container";

const inter = Inter({ subsets: ["latin"] });

const Page: NextPage = () => {
  return (
    <div>
        <TodoProvider>
          <div className="p-5 inset-0 mx-auto md:w-[75vh]">
            <LogoutContainer />
            <h1 className="font-bold text-2xl flex flex-col justify-center items-center border-b my-5 py-5 border-gray-600 ">
              TODO APP
            </h1>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
            </Suspense>
            <AddTodo />
            {/* <Suspense fallback={<div>Loading...</div>}> */}
              <TodosMessage />
            {/* </Suspense> */}
          </div>
        </TodoProvider>
        {/* <Toaster /> */}
      </div>
  );
};

export default Page;
