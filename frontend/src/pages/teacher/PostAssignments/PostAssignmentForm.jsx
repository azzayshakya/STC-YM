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
    if (!user) return; // safety check
    submitAssignmentMutation({ ...data, postedBy: user.id });
    setShowForm(false);
    form.reset();
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>

      {/* Teacher button */}
      {user?.role === "teacher" && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Post Assignment"}
        </button>
      )}

      {/* Assignment Form */}
      {showForm && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              {...form.register("title")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              {...form.register("description")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Subject</label>
            <input
              type="text"
              {...form.register("subject")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
              placeholder="Enter subject"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Deadline</label>
            <input
              type="date"
              {...form.register("deadline")}
              className="w-full rounded-lg bg-gray-700 px-3 py-2"
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 py-2 rounded-lg hover:bg-green-700"
          >
            {isSubmitting ? "Posting..." : "Post Assignment"}
          </button>
        </form>
      )}

      {/* Assignment List */}
      <div className="space-y-4 mt-6">
        {assignments?.length ? (
          assignments.map((a) => (
            <div
              key={a._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="font-bold text-lg">{a.title}</h3>
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
