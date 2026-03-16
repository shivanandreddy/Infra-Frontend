import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, MoreVertical } from "lucide-react";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editId, setEditId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const empid = user.empid;

  const [form, setForm] = useState({
    name: "",
    url: ""
  });

  const API = `${import.meta.env.VITE_API_BASE_URL}/infra/users/${empid}/links`;

  const fetchApps = async () => {
    try {
      const res = await axios.get(API);
      setApps(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const addApp = async () => {
    try {
      await axios.post(API, form);
      setForm({ name: "", url: "" });
      setShowModal(false);
      fetchApps();
    } catch (err) {
      console.log(err);
    }
  };

  const updateApp = async () => {
    try {
      await axios.put(`${API}/${editId}`, form);
      setForm({ name: "", url: "" });
      setEditId(null);
      setShowModal(false);
      fetchApps();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteApp = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchApps();
    } catch (err) {
      console.log(err);
    }
  };

  const openEdit = (app) => {
    setForm({ name: app.name, url: app.url });
    setEditId(app._id);
    setShowModal(true);
    setMenuOpen(null);
  };

  const getIcon = (url) => {
    const domain = url.replace("https://", "").replace("http://", "");
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">My Apps</h1>

        <button
          onClick={() => {
            setForm({ name: "", url: "" });
            setEditId(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add App
        </button>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {apps.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center group relative"
          >

            {/* 3 dots */}
            <button
              onClick={() =>
                setMenuOpen(menuOpen === app._id ? null : app._id)
              }
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <MoreVertical size={18} />
            </button>

            {/* Dropdown menu */}
            {menuOpen === app._id && (
              <div className="absolute right-2 top-8 bg-white shadow-lg border rounded-lg w-28 z-10">

                <button
                  onClick={() => openEdit(app)}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteApp(app._id)}
                  className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Delete
                </button>

              </div>
            )}

            {/* App link */}
            <a
              href={app.url.startsWith("http") ? app.url : `https://${app.url}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2"
            >

              <img
                src={getIcon(app.url)}
                alt={app.name}
                className="w-12 h-12"
              />

              <p className="text-sm font-medium text-gray-700 break-words">
                {app.name}
              </p>

            </a>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Update App" : "Add New App"}
            </h2>

            <input
              type="text"
              placeholder="App Name"
              className="w-full border p-2 mb-3 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="App URL"
              className="w-full border p-2 mb-4 rounded"
              value={form.url}
              onChange={(e) =>
                setForm({ ...form, url: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={editId ? updateApp : addApp}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {editId ? "Update" : "Add"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyApps;
