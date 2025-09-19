import { useContext } from "react";
import { UserContext } from "@/context/user.context";
import { useAssignmentsQuery } from "../PostAssignments/useAssignmentQuery";

const AssignmentsList = () => {
  const { user } = useContext(UserContext);
  const { data: assignments, isLoading } = useAssignmentsQuery(user);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mx-auto mt-6 max-w-2xl space-y-4">
      {assignments?.length ? (
        assignments.map((a) => (
          <div
            key={a._id}
            className="rounded-lg border border-border bg-card p-5 shadow-md"
          >
            <h3 className="text-lg font-semibold text-foreground">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {a.description}
            </p>
            <p className="mt-2 text-sm">
              <strong className="font-medium">Subject:</strong> {a.subject}
            </p>
            <p className="text-sm">
              <strong className="font-medium">Deadline:</strong> {a.deadline}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Teacher: {a.postedBy || "Unknown"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No assignments yet.</p>
      )}
    </div>
  );
};

export default AssignmentsList;
