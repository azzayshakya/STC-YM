import { useState, useContext } from "react";
import { UserContext } from "@/context/user.context";
import { useCreateAssignmentMutation } from "./useCreateAssignmentMutation";
import { useDefineAssignmentForm } from "./useDefineAssignment";
import { useAssignmentsQuery } from "./useAssignmentQuery";

const AssignmentsPage = () => {
  const { user } = useContext(UserContext);
  const { data: assignments, isLoading } = useAssignmentsQuery(user);
  const { form, errors } = useDefineAssignmentForm();
  const { submitAssignmentMutation, isSubmitting } =
    useCreateAssignmentMutation();

  const [showForm, setShowForm] = useState(false);

  const onSubmit = (data) => {
    if (!user) return;
    submitAssignmentMutation({ ...data, postedBy: user.id });
    setShowForm(false);
    form.reset();
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mx-auto max-w-2xl p-6 text-white">
      <h2 className="mb-4 text-2xl font-bold">Assignments</h2>

      {user?.role === "teacher" && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Post Assignment"}
        </button>
      )}

      {showForm && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg bg-gray-800 p-4 shadow-lg"
        >
          <div>
            <label className="mb-1 block text-sm">Title</label>
            <input
              type="text"
              {...form.register("title")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm">Description</label>
            <textarea
              {...form.register("description")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm">Subject</label>
            <input
              type="text"
              {...form.register("subject")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
              placeholder="Enter subject"
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm">Deadline</label>
            <input
              type="date"
              {...form.register("deadline")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
            />
            {errors.deadline && (
              <p className="text-sm text-red-500">{errors.deadline.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-600 py-2 hover:bg-green-700"
          >
            {isSubmitting ? "Posting..." : "Post Assignment"}
          </button>
        </form>
      )}

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
    </div>
  );
};

export default AssignmentsPage;
