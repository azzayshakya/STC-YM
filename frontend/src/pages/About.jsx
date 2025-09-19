import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <section className="flex-1 px-6 py-12 md:px-20">
        <motion.h2
          className="mb-4 text-3xl font-bold"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          About Student–Teacher Connect
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          This platform was built as part of a MERN Stack Developer Assessment.
          Its objective is to provide a simple interface for teachers and
          students to connect through assignments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <h3 className="mb-3 text-2xl font-semibold">Features</h3>
          <ul className="list-disc space-y-2 pl-6 text-gray-300">
            <li>Role-based login: Teacher or Student</li>
            <li>
              Teachers can post assignments (title, description, deadline,
              subject)
            </li>
            <li>Students can view a list of assignments</li>
          </ul>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <h3 className="mb-3 text-2xl font-semibold">Purpose</h3>
          <p className="text-gray-300">
            The project demonstrates skills in full-stack development using the
            MERN stack. It showcases authentication, form handling, API
            integration, and responsive UI with React and TailwindCSS.
          </p>
        </motion.div>
      </section>

      <footer className="bg-gray-800 py-4 text-center text-gray-400">
        © {new Date().getFullYear()} Student–Teacher Connect. All rights
        reserved.
      </footer>
    </div>
  );
}
