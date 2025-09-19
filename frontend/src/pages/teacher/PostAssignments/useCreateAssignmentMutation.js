import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAssignmentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: submitAssignmentMutation, isPending: isSubmitting } =
    useMutation({
      mutationFn: async (newAssignment) => {
        const res = await fetch("http://localhost:3000/assignment/create", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("stcUserToken")}`, // optional if auth
          },
          body: JSON.stringify(newAssignment),
        });
        if (!res.ok) throw new Error("Failed to post assignment");
        return res.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["assignments"]);
      },
    });

  return { submitAssignmentMutation, isSubmitting };
};
