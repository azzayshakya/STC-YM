import { useState, useContext } from "react";
import { UserContext } from "@/context/user.context";
import { useCreateAssignmentMutation } from "./useCreateAssignmentMutation";
import { useDefineAssignmentForm } from "./useDefineAssignment";

const AssignmentsPageForm = () => {
  const { user } = useContext(UserContext);
  const { form, errors } = useDefineAssignmentForm();
  const { submitAssignmentMutation, isSubmitting } =
    useCreateAssignmentMutation();

  const [showForm, setShowForm] = useState(false);

  const onSubmit = (data) => {
    if (!user) return;
    submitAssignmentMutation({ ...data, postedBy: user.STCuserEmail });
    setShowForm(false);
    form.reset();
  };

  return (
    <div className="mx-auto max-w-2xl p-6 text-white">
      <h2 className="mb-4 text-2xl font-bold">Assignments</h2>

      {user?.STCuserType === "teacher" && (
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
    </div>
  );
};

export default AssignmentsPageForm;
