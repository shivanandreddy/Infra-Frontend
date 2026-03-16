import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // trigger animation on mount
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/infra/users/login`,
        { email, password }
      );


      

      const { token, user } = response.data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/infra/home");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-50 via-white to-black-100 flex items-center justify-center px-4">
      <div
        className={`w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-700 shadow-2xl ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-100 to-indigo-200 relative items-center justify-center p-8 overflow-hidden">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-4268417-3551748.png"
            alt="Login Visual"
            className="w-80 animate-float"
          />
          {/* Floating circles for background effect */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-16 w-32 h-32 bg-indigo-300 rounded-full opacity-20 animate-pulse-slow"></div>
        </div>

        {/* Right Login Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 relative" >
          {/* Animated background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-white via-blue-50 to-indigo-50 animate-gradient-move "></div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8 animate-slide-down">
            Infra IT Services
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 shadow-sm transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-blue-500 group-focus-within:scale-[1.02] hover:scale-[1.02]">
                <Mail className="text-gray-400 mr-2 animate-bounce-slow" size={18} />
                <input
                  type="email"
                  className="w-full bg-transparent focus:outline-none text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 shadow-sm transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-blue-500 group-focus-within:scale-[1.02] hover:scale-[1.02]">
                <Lock className="text-gray-400 mr-2 animate-bounce-slow" size={18} />
                <input
                  type="password"
                  className="w-full bg-transparent focus:outline-none text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium py-2.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500 animate-slide-up">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          /* Floating Image Animation */
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          /* Slow Bounce for Icons */
          .animate-bounce-slow {
            animation: bounce 2.5s infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }

          /* Gradient Background Animation */
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradientMove 8s ease infinite;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Slow pulsing circles */
          .animate-pulse-slow {
            animation: pulse 6s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }

          /* Slide animations */
          .animate-slide-down {
            animation: slideDown 0.8s ease-out;
          }
          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .animate-slide-up {
            animation: slideUp 0.8s ease-out;
          }
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
