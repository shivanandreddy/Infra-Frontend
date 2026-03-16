import React, { useState } from "react";
import {
  Home,
  User,
  LogOut,
  NotebookText,
  Menu,
  ListTodo,
  Tickets,
  Codesandbox,
  Boxes,
  Laptop,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeSidebar = () => setIsOpen(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-slate-800 text-white border-l-4 border-emerald-400"
      : "text-slate-300 hover:bg-slate-800/70 hover:text-white border-l-4 border-transparent";

  const subLink =
    "block px-4 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition truncate";

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between bg-slate-900 text-white px-4 shadow z-50">
        <h1 className="flex items-center gap-2 font-semibold text-lg truncate">
          <Laptop className="w-5 h-5 text-emerald-400" />
          Infra IT
        </h1>

        <button onClick={() => setIsOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 min-h-screen md:h-screen w-60 bg-slate-900 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col shadow-xl pt-14 md:pt-0`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-800">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-lg font-semibold text-white"
          >
            <Laptop className="w-7 h-7 text-emerald-400" />
            Infra IT Services
          </motion.h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-2 text-sm">

            {/* Dashboard */}
            <li>
              <Link
                to="/infra"
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition ${isActive("/infra")}`}
              >
                <Home size={18} />
                <span className="truncate">Dashboard</span>
              </Link>
            </li>

            {/* My Apps */}
            <li>
              <Link
                to="/infra/myapps"
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition ${isActive("/infra/myapps")}`}
              >
                <Boxes size={18} />
                <span className="truncate">My Apps</span>
              </Link>
            </li>

            {/* Todos */}
            <li>
              <Link
                to="/infra/todos"
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition ${isActive("/infra/todos")}`}
              >
                <ListTodo size={18} />
                <span className="truncate">Todo List</span>
              </Link>
            </li>

            {/* Tickets */}
            <li>
              <button
                onClick={() => toggleMenu("tickets")}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-300 hover:bg-slate-800/70 transition"
              >
                <Tickets size={18} />

                <span className="truncate">Infra Tickets</span>

                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-300 ${
                    openMenu === "tickets" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openMenu === "tickets" && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-2 space-y-1 overflow-hidden"
                  >
                    <li>
                      <Link to="/infra/tickets/create" className={subLink}>
                        Create Ticket
                      </Link>
                    </li>

                    <li>
                      <Link to="/infra/tickets" className={subLink}>
                        Get Tickets
                      </Link>
                    </li>

                    <li>
                      <Link to="/infra/tickets/update" className={subLink}>
                        Update Ticket
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Inventory */}
            <li>
              <button
                onClick={() => toggleMenu("inventory")}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-300 hover:bg-slate-800/70 transition"
              >
                <Codesandbox size={18} />

                <span className="truncate">Infra Inventory</span>

                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-300 ${
                    openMenu === "inventory" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openMenu === "inventory" && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-2 space-y-1 overflow-hidden"
                  >
                    <li><Link to="*" className={subLink}>Create Items</Link></li>
                    <li><Link to="*" className={subLink}>Get Items</Link></li>
                    <li><Link to="*" className={subLink}>Update Items</Link></li>
                    <li><Link to="*" className={subLink}>Assign Items</Link></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Handovers */}
            <li>
              <button
                onClick={() => toggleMenu("handover")}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-300 hover:bg-slate-800/70 transition"
              >
                <NotebookText size={18} />

                <span className="truncate">Shift Handovers</span>

                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-300 ${
                    openMenu === "handover" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openMenu === "handover" && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-2 space-y-1 overflow-hidden"
                  >
                    <li><Link to="/infra/error/underdevelopment" className={subLink}>My Pending Handovers</Link></li>
                    <li><Link to="/infra/handover/" className={subLink}>Create Handover</Link></li>
                    <li><Link to="/infra/error/underdevelopment" className={subLink}>View Team Handovers</Link></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Security */}
            <li>
              <button
                onClick={() => toggleMenu("security")}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-300 hover:bg-slate-800/70 transition"
              >
                <User size={18} />

                <span className="truncate">Security Admin</span>

                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-300 ${
                    openMenu === "security" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openMenu === "security" && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-2 space-y-1 overflow-hidden"
                  >
                    <li><Link to="/infra/users/register" className={subLink}>Register</Link></li>
                    <li><Link to="/infra/users/all" className={subLink}>Get Users</Link></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

          </ul>
        </nav>

        {/* User Info */}
        <div className="border-t border-slate-800 px-6 py-4 text-sm">
          <p className="font-semibold text-white truncate">
            {user?.name?.toUpperCase()}
          </p>

          <p className="text-xs text-slate-400 truncate">
            Role : {user?.role}
          </p>

          <p className="text-xs text-slate-400 truncate">
            Workgroup : {user?.workgroup}
          </p>
        </div>

        {/* Logout */}
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-slate-800 transition"
          >
            <LogOut size={18} />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
