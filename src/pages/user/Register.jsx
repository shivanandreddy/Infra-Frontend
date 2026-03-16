import React, { useState } from "react";
import axios from "axios";
import { UserPlus } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    email: "",
    role: "",
    workgroup: "",
    password: "",
    confirmPassword: ""
  });

  const userRoles = ["TEAM_MEMBER", "TEAM_LEAD", "MANAGER", "ADMIN"];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      return setError("Unauthorized. Please login again.");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/infra/users`,
        {
          empid: formData.userid,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          workgroup: formData.workgroup,
          password: formData.password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(res.data.message || "User registered successfully");

      setFormData({
        userid: "",
        name: "",
        email: "",
        role: "",
        workgroup: "",
        password: "",
        confirmPassword: ""
      });

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6 py-10">

      <div className="w-full max-w-3xl mt-3 animate-fadeUp ">

        {/* Title */}
        <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-900 tracking-tight mb-6">
          <UserPlus className="text-emerald-500 animate-bounce w-10 h-10" />
          Create User
          <UserPlus className="text-emerald-500 animate-bounce w-10 h-10" />
        </h2>

        {/* Success */}
        {success && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-sm animate-slideDown shadow-sm">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm animate-slideDown shadow-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 mr-5 backdrop-blur-sm"
        >

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <input
              type="text"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              placeholder="Employee ID"
              className="input-style"
              required
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="input-style"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-style"
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-style bg-white"
              required
            >
              <option value="">Select role</option>
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {role.replace("_", " ")}
                </option>
              ))}
            </select>

            <select
              name="workgroup"
              value={formData.workgroup}
              onChange={handleChange}
              className="input-style bg-white"
              required
            >
              <option value="">Select Workgroup</option>
              <option value="IT">IT</option>
              <option value="Admin">Admin</option>
            </select>

          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-style"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="input-style"
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-7 py-2.5 text-sm font-medium text-white
                       hover:bg-emerald-600 transition transform hover:scale-[1.03]
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Registering..." : "Register"}
          </button>

        </form>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          padding: 10px 14px;
          font-size: 14px;
          transition: all 0.25s ease;
        }

        .input-style:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16,185,129,0.2);
          transform: scale(1.02);
        }

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

export default Register;
