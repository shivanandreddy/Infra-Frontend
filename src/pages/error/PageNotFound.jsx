import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
   <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6 mt-5">

  {/* Soft Floating Shapes */}
  <div className="absolute top-20 left-20 w-40 h-40 bg-blue-100 dark:bg-blue-800 opacity-40 rounded-full animate-float"></div>
  <div className="absolute bottom-20 right-20 w-56 h-56 bg-indigo-100 dark:bg-indigo-800 opacity-30 rounded-full animate-float-delayed"></div>
 <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-300 dark:bg-purple-700 opacity-30 rounded-full animate-pulse-slow"></div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transform transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* 404 Number */}
        <h1 className="text-[120px] sm:text-[160px] font-extrabold bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 bg-clip-text text-transparent animate-gradient-move">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-500 dark:text-red-900 mb-4 animate-slide-down">
          Oops! Page Not Found
        </h2>

        <p className="text-red-600 dark:text-black-900 max-w-md mx-auto mb-8 animate-slide-up">
          The page you are looking for might have been removed, renamed, 
          or is temporarily unavailable. Please check the URL or return 
          to the homepage.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/infra/home")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl shadow-lg transition-all duration-300"
        >
          Go back to Dashboard
        </button>
      </div>

      {/* Animations */}
      <style>
        {`
          /* Floating animation */
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 8s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          /* Slow pulse */
          .animate-pulse-slow {
            animation: pulseSlow 6s ease-in-out infinite;
          }

          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }

          /* Slide down */
          .animate-slide-down {
            animation: slideDown 0.8s ease-out;
          }

          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          /* Slide up */
          .animate-slide-up {
            animation: slideUp 0.8s ease-out;
          }

          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          /* Gradient text animation */
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradientMove 5s ease infinite;
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default PageNotFound;