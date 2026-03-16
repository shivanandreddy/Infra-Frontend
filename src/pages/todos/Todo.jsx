import { useState, useEffect } from "react";
import axios from "axios";
import { Check, Delete, Plus } from "lucide-react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user.id;
  const workgroup = user.workgroup;

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/infra/todos?user=${userId}`;

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    try {
      setLoading(true);

      const payload = {
        todo,
        workgroup,
        user: userId,
      };

      const res = await axios.post(API_URL, payload);

      setTodos([res.data, ...todos]);
      setTodo("");
    } catch (error) {
      console.error("Error adding todo", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Todo (Triggered by Tick Icon)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/infra/todos/${id}`);
      setTodos(todos.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-10 py-6 ">
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 mt-5">
        Todo List
      </h1>

      {/* Add Todo */}
      <form
        onSubmit={addTodo}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Enter todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md"
        >
          <Plus size={18} />
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Todo List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos found.</p>
        ) : (
          todos.map((item) => (
           <div
  key={item._id}
  className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm gap-3 overflow-hidden"
>
  <div className="flex-1 min-w-0">
    <p className="font-medium text-gray-800 text-sm sm:text-base break-words break-all whitespace-normal leading-relaxed">
      {item.todo}
    </p>

    <p className="text-xs text-gray-500 mt-1">
      Created : {Date(item.createdAt).toLocaleString()}
    </p>
  </div>

  <button
    onClick={() => deleteTodo(item._id)}
    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition flex-shrink-0"
  >
    <Check size={18} />
  </button>
  <button
    onClick={() => deleteTodo(item._id)}
    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition flex-shrink-0"
  >
    <Delete size={18} />
  </button>
</div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
