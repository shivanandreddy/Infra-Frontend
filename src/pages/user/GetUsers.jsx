import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.get("http://localhost:3000/infra/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users || response.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="mt-4 animate-fadeUp">

        <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-900 tracking-tight mb-5">
          <Users className="text-emerald-500 animate-bounce w-12 h-12" />
          Users List
        </h2>

        <button
          onClick={fetchUsers}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white
                     hover:bg-emerald-700 transition transform hover:scale-[1.05]
                     active:scale-95 shadow-md mb-6"
        >
          Refresh Users
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-500 font-medium py-4 animate-slideDown">
          {error}
        </div>
      )}

      {/* Mobile / Tablet Cards */}
      {!loading && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5">

          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800 text-lg truncate">
                  {user.name}
                </h3>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-2">

                <p>
                  <span className="font-medium text-gray-700">ID:</span>{" "}
                  {user.userid}
                </p>

                <p>
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {user.email}
                </p>

                <p>
                  <span className="font-medium text-gray-700">Role:</span>{" "}
                  {user.role}
                </p>

                <p>
                  <span className="font-medium text-gray-700">Created:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* Desktop Table */}
      {!loading && users.length > 0 && (
        <div className="hidden lg:block mt-4">

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">

            <table className="min-w-full bg-white text-sm">

              <thead className="bg-emerald-700 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-5 py-3 text-left">#</th>
                  <th className="px-5 py-3 text-left">ID</th>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">Role</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Created</th>
                  <th className="px-5 py-3 text-left">Updated</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-emerald-50 transition"
                  >
                    <td className="px-5 py-3">{index + 1}</td>
                    <td className="px-5 py-3">{user.userid}</td>
                    <td className="px-5 py-3 font-medium">{user.name}</td>
                    <td className="px-5 py-3 truncate max-w-xs">
                      {user.email}
                    </td>
                    <td className="px-5 py-3 capitalize">{user.role}</td>

                    <td className="px-5 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-3">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && users.length === 0 && (
        <div className="py-16 text-slate-400 text-lg">
          No users found.
        </div>
      )}

      <style jsx>{`
        .animate-fadeUp {
          animation: fadeUp 0.6s ease;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease;
        }

        @keyframes fadeUp {
          from { opacity:0; transform: translateY(20px); }
          to { opacity:1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity:0; transform: translateY(-10px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default GetUsers;