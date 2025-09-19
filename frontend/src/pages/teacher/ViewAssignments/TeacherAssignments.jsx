import { useContext } from "react";
import { UserContext } from "@/context/user.context";
import { useAssignmentsQuery } from "../PostAssignments/useAssignmentQuery";

const AssignmentsList = () => {
  const { user } = useContext(UserContext);
  const { data: assignments, isLoading } = useAssignmentsQuery(user);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mt-6 space-y-4">
      {assignments?.length ? (
        assignments.map((a) => (
          <div
            key={a._id}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md"
          >
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="text-sm text-gray-400">{a.description}</p>
            <p className="text-sm">
              <strong>Subject:</strong> {a.subject}
            </p>
            <p className="text-sm">
              <strong>Deadline:</strong> {a.deadline}
            </p>
          </div>
        ))
      ) : (
        <p>No assignments yet.</p>
      )}
    </div>
  );
};

export default AssignmentsList;
