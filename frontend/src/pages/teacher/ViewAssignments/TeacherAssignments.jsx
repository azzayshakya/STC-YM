import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "@/context/user.context";

let assignmentsDB = [
  {
    id: 1,
    teacherEmail: "ajay@example.com",
    title: "Math Homework",
    description: "Solve 10 problems from chapter 3",
    dueDate: "2025-09-25",
    teacherName: "Ajay Teacher",
  },
  {
    id: 2,
    teacherEmail: "teacher2@example.com",
    title: "Science Assignment",
    description: "Write about photosynthesis",
    dueDate: "2025-09-28",
    teacherName: "Teacher 2",
  },
];

export default function TeacherAssignmentsPage() {
  const { user } = useContext(UserContext);

  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments", user?.email],
    queryFn: async () => {
      return assignmentsDB.filter((a) => a.teacherEmail === user?.email);
    },
    enabled: !!user?.email,
  });

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="mb-4 text-2xl font-bold">My Assignments</h2>

      {assignments.length === 0 ? (
        <p className="text-gray-500">No assignments yet.</p>
      ) : (
        <ul className="mb-6 space-y-3">
          {assignments.map((a) => (
            <li key={a.id} className="rounded-lg border p-3 shadow-sm">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.description}</p>
              <p className="text-xs text-gray-500">
                Due: {a.dueDate} | Teacher: {a.teacherName}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
