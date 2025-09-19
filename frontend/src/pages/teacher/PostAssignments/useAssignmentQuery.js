import { useQuery } from "@tanstack/react-query";

export const useAssignmentsQuery = (user) => {
  return useQuery({
    queryKey: ["assignments", user?.STCuserType, user?.STCuser],
    queryFn: async () => {
      const url = "http://localhost:3000/assignment/get-all-assignments";
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stcUserToken")}`,
        },
      });
      console.log("fetch the assignment ", res);

      if (!res.ok) throw new Error("Failed to fetch assignments");
      return res.json();
    },
  });
};
