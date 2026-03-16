import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    workgroup: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch Ticket
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/infra/tickets/${id}`
        );
        setTicket(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTicket();
  }, [id]);

  // Handle Change
  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  // Update Ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/infra/tickets/${id}`,
        ticket
      );

      alert("Ticket Updated Successfully");
      navigate("/tickets");
    } catch (error) {
      console.error(error);
      alert("Failed to update ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
      
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Update Ticket
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow"
      >

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
            className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={ticket.status}
            onChange={handleChange}
            className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">Select</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Workgroup */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Workgroup</label>
          <input
            type="text"
            name="workgroup"
            value={ticket.workgroup}
            onChange={handleChange}
            className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            rows="4"
            className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/tickets")}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {loading ? "Updating..." : "Update Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTicket;
