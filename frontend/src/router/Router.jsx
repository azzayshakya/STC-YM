import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { ErrorPage } from "../pages/common/ErrorPage";
import { NotFoundPage } from "../pages/common/NotFoundPage";
import RedirectPage from "../pages/common/RedirectPage";
import HomeUILayout from "../layout/Home/HomeLayout";
import LoginMain from "@/auth/login/LoginMain";
import CreateAccountMain from "@/auth/create-account/CreateAccountMain";
import TeacherAssignments from "@/pages/teacher/TeacherAssignments";
import StudentAssignment from "@/pages/student/StudentAssignment";
import AboutPage from "@/pages/About";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeUILayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LoginMain />,
        },
        {
          path: "/about-us",
          element: <AboutPage/>,
        },
        {
          path: "/create-account",
          element: <CreateAccountMain />,
        },
        {
          path: "/post-assignments",
          element: <TeacherAssignments />,
        },
        {
          path: "/assignments",
          element: <StudentAssignment />,
        },
       
        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "/redirect",
          element: <RedirectPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  // { basename: import.meta.env.BASE_URL }
);

export default router;
