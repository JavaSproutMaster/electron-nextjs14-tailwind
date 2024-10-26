
import { useTodos as useTodo } from "../context/todo";
// import axios from "axios";
// import { useFormik } from "formik";
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useToast } from "./ui/use-toast";

type Props = {};

const taskSchema = yup.object().shape({
  todo: yup.string().min(5).required(" Vaild task is required"),
});

const AddTodo = (props: Props) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleAddTodo, isLoading, setIsLoading } = useTodo();

  //fix tost message and data not saved in server
  // const onTaskAdded = async () => {
    // try {
    //   setIsLoading(true);
    //   const response = await axios.post("/api/usertask", {
    //     task: values.todo,
    //   });
    //   console.log(response);
    //   if (response.data) {
    //     toast({ title: "Task added successfully" });
    //     console.log(response.data);
    //   } else {
    //     console.error("Empty response data received");
    //   }
    // } catch (error) {
    //   console.error("Error adding task:", error);
    //   // toast({title: "Failed to add task. Please try again later."});
    // } finally {
    //   setIsLoading(false);
    // }
  // };

  // const {
  //   values,
  //   touched,
  //   errors,
  //   handleBlur,
  //   isValid,
  // } = useFormik({
  //   initialValues: {
  //     todo: "",
  //   },
  //   validationSchema: taskSchema,
  //   onSubmit: (values: { todo: string }, formikHelpers: any) => {
  //     handleAddTodo(values.todo);
  //     formikHelpers.resetForm();
  //   },
  // });
  const [isValid, setIsValid] = useState();
  const [todo, setTodo] = useState("");
  const onTaskAdded = (e: any) => {
    handleAddTodo(e.target.value);
  }
  const handleChange = (e) => {
    setTodo(e.values);
  }
  useEffect(() => {
    setIsSubmitting(isValid);
  }, [isValid]);

  return (
    <form
      className="grid gap-5 grid-cols-3 grid-rows-1 px-5 my-8 items-center"
      // onSubmit={handleSubmit}
    >
      <input
        className={`rounded-lg p-3 lg:mr-5 placeholder:text-black/30 block py-1.5 w-full
          shadow-sm  focus:outline-none border-2 bg-transparent border-gray-600
           placeholder:text-gray-400 focus:border-blue-600 transition-all col-span-3 lg:col-span-2 row-span-1`}
        type="text"
        name="todo"
        placeholder="Write your task...."
        value={todo}
        onChange={handleChange}
      />
      <button
        onClick={onTaskAdded}
        className={`px-6 py-2 hover:opacity-70 rounded-full col-span-3 lg:col-span-1 bg-blue-600 bg-blue-600`}
      >
        <span className="flex justify-center items-center gap-3">
          Add task
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : ""}
        </span>
      </button>
    </form>
  );
};

export default AddTodo;
