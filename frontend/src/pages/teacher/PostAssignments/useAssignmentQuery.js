import { useQuery } from "@tanstack/react-query";

export const useAssignmentsQuery = (user) => {
  return useQuery({
    queryKey: ["assignments", user?.role, user?.id],
    queryFn: async () => {
      const url =
        user?.role === "teacher"
          ? `/api/assignments?postedBy=${user.id}`
          : "/api/assignments";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch assignments");
      return res.json();
    },
  });
};
