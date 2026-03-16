import { motion } from "framer-motion";
import { Wrench, Rocket } from "lucide-react";

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6">
      
      <div className="text-center max-w-xl">

        {/* Floating Icon */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <div className="bg-blue-100 p-6 rounded-full shadow-lg">
            <Wrench size={40} className="text-blue-600" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800"
        >
          Page Under Development
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-600 text-lg"
        >
          We're working hard to bring this feature to you. 🚀  <br/>
          Please check back soon!
        </motion.p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <motion.span
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
          <motion.span
            className="w-3 h-3 bg-purple-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
          />
          <motion.span
            className="w-3 h-3 bg-pink-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Rocket Animation */}
        <motion.div
          animate={{ x: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="flex justify-center mt-10"
        >
          <Rocket size={36} className="text-purple-500" />
        </motion.div>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-gray-400">
          Thank you for your patience 🙏
        </p>
      </div>
    </div>
  );
};

export default UnderDevelopment;
