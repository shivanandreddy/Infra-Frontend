import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const GetTickets = () => {

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const [input, setInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const [debouncedInput, setDebouncedInput] = useState("");
  const [debouncedStatus, setDebouncedStatus] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  /* FETCH TICKETS */
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_BASE_URL}/infra/tickets");

      setTickets(res.data);
      setFilteredTickets(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  /* DEBOUNCE SEARCH INPUT */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  /* DEBOUNCE STATUS */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedStatus(statusInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [statusInput]);

  /* FILTER LOGIC */
  useEffect(() => {

    let result = tickets;

    if (debouncedInput.trim()) {
      result = result.filter((t) =>
        t.key.toLowerCase().includes(debouncedInput.toLowerCase()) ||
        t.title.toLowerCase().includes(debouncedInput.toLowerCase()) ||
        t.description.toLowerCase().includes(debouncedInput.toLowerCase())
      );
    }

    if (debouncedStatus.trim()) {
      result = result.filter((t) =>
        t.status.toLowerCase().includes(debouncedStatus.toLowerCase())
      );
    }

    setFilteredTickets(result);
    setPage(1);

  }, [debouncedInput, debouncedStatus, tickets]);

  /* CLEAR FILTERS */
  const clearSearch = () => {
    setInput("");
    setStatusInput("");
    setFilteredTickets(tickets);
    setPage(1);
  };

  /* PAGINATION */
  const startIndex = (page - 1) * limit;

  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + limit
  );

  const totalPages = Math.ceil(filteredTickets.length / limit);

  /* STATUS COLOR */
  const statusColor = (status) => {
    if (status === "Open") return "bg-blue-100 text-blue-700";
    if (status === "Closed") return "bg-green-100 text-green-700";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  /* PRIORITY COLOR */
  const priorityColor = (priority) => {
    if (priority === "High") return "text-red-600";
    if (priority === "Medium") return "text-yellow-600";
    if (priority === "Low") return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6 ">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3 mt-5">
        <h2 className="text-2xl font-semibold text-green-600">INFRA Tickets</h2>

        <div className="flex gap-2 flex-wrap">

          {/* SEARCH */}
          <div className="flex items-center border rounded-md px-2 bg-white">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search  by Key or Title"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-2 py-2 text-sm outline-none"
            />
          </div>

          {/* STATUS FILTER */}
          <select
            value={statusInput}
            onChange={(e) => setStatusInput(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm bg-white"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white border rounded-md">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Key</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Workgroup</th>
            </tr>
          </thead>

          <tbody>

            {paginatedTickets.length > 0 ? (
              paginatedTickets.map((ticket) => (
                <tr key={ticket._id} className="border-t hover:bg-gray-50">

                  <td className="px-4 py-3 text-blue-600 font-medium">
                    {ticket.key}
                  </td>

                  <td className="px-4 py-3">
                    {ticket.title}
                  </td>

                  <td className={`px-4 py-3 font-medium ${priorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded ${statusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {ticket.workgroup}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No tickets found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex gap-3 mt-6 items-center">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default GetTickets;
