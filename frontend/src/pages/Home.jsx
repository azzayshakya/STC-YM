import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="md:text-6xl mb-4 text-4xl font-extrabold"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to{" "}
          <span className="text-blue-500">Student–Teacher Connect</span>
        </motion.h1>

        <motion.p
          className="mb-8 max-w-2xl text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A modern platform where teachers can post assignments and students can
          view them — simple, clean, and effective.
        </motion.p>

        <motion.div
          className="space-x-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="transform rounded-lg bg-blue-600 px-6 py-3 transition hover:scale-105 hover:bg-blue-700"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/about-us")}
            className="transform rounded-lg border px-6 py-3 transition hover:scale-105 hover:bg-gray-800"
          >
            Learn More
          </button>
        </motion.div>
      </section>

      <footer className="bg-gray-800 py-4 text-center text-gray-400">
        © {new Date().getFullYear()} Student–Teacher Connect. All rights
        reserved.
      </footer>
    </div>
  );
}
