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
    submitAssignmentMutation({
      ...data,
      postedBy: user.STCuserEmail,
      teacherName: user.username || "Unknown Teacher",
    });
    setShowForm(false);
    form.reset();
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-card p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Post New Assignment</h2>
        {user?.STCuserType === "teacher" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-md bg-primary px-4 py-2 text-white transition hover:bg-purple-700"
          >
            {showForm ? "Cancel" : "Post Assignment"}
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 space-y-4"
        >
          {/* Title */}
          <div>
            <input
              type="text"
              {...form.register("title")}
              placeholder="Title"
              className="gcl-form-control w-full rounded-md border border-border bg-input px-3 py-2 placeholder-gray-400 focus:outline-none"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...form.register("description")}
              placeholder="Description"
              rows={3}
              className="gcl-form-control w-full rounded-md border border-border bg-input px-3 py-2 placeholder-gray-400 focus:outline-none"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <input
              type="text"
              {...form.register("subject")}
              placeholder="Subject"
              className="gcl-form-control w-full rounded-md border border-border bg-input px-3 py-2 placeholder-gray-400 focus:outline-none"
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <input
              type="date"
              {...form.register("deadline")}
              className="gcl-form-control w-full rounded-md border border-border bg-input px-3 py-2 focus:outline-none"
            />
            {errors.deadline && (
              <p className="text-sm text-red-500">{errors.deadline.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Posting..." : "Post Assignment"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AssignmentsPageForm;
