import { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const CreateTicket = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    workgroup: "",
    user: "69a43609b192b13b6f743780", // replace with logged-in user id
  });

  const [loading, setLoading] = useState(false);

  const priorities = ["Low", "Medium", "High", "Critical"];
  const workgroups = ["IT", "Network", "Security", "Support"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTicket = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "${import.meta.env.VITE_API_BASE_URL}/infra/tickets", // POST API
        formData
      );

     

      alert("Ticket Created Successfully");

      setFormData({
        title: "",
        description: "",
        priority: "Low",
        workgroup: "",
        user: user.id,
      });

    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">

      <h2 className="text-2xl font-semibold mb-6 text-green-500 mt-5">
        Create Ticket
      </h2>

      <form
        onSubmit={createTicket}
        className="w-full max-w-3xl space-y-5"
      >

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter ticket title"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter ticket description"
            className="border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorities.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Workgroup */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Workgroup</label>

          <select
            name="workgroup"
            value={formData.workgroup}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Workgroup</option>

            {workgroups.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          {loading ? "Creating..." : "Create Ticket"}
        </button>

      </form>

    </div>
  );
};

export default CreateTicket;
