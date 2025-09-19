import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "@/context/user.context";
import { logoutApi } from "@/apis/apiServices";
import { toast } from "react-toastify";

export default function HomeTopBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef();

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      if (res.status === true) {
        toast.success(res.message);
        localStorage.removeItem("stcUser");
        localStorage.removeItem("stcUserToken");
        setUser(null);
        navigate("/login");
      } else {
        toast.error(res.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong during logout.");
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-navy-blue sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => navigate("/home")}
        >
          <h1 className="text-xl font-bold text-white md:text-2xl">STC</h1>
        </div>

        <div className="hidden items-center space-x-6 md:flex">
          <a
            href="/home"
            className="text-white transition-colors hover:text-primary"
          >
            Home
          </a>
          <a
            href="/about-us"
            className="text-white transition-colors hover:text-primary"
          >
            About
          </a>

          {user?.STCuserType === "teacher" && (
            <a
              href="/post-assignments"
              className="text-white transition-colors hover:text-primary"
            >
              Post Assignments
            </a>
          )}
          {user?.STCuserType === "student" && (
            <a
              href="/assignments"
              className="text-white transition-colors hover:text-primary"
            >
              Assignments
            </a>
          )}
        </div>

        <div className="hidden items-center space-x-3 md:flex">
          {!user ? (
            <>
              <button
                className="rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-opacity-90"
                onClick={() => navigate("/create-account")}
              >
                Sign Up
              </button>
              <button
                className="rounded-lg border px-4 py-2 text-white transition-colors hover:bg-opacity-90"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
            </>
          ) : (
            <>
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="rounded-full bg-gray-700 p-2 text-white hover:bg-gray-600"
                >
                  {user.STCuser?.[0].toUpperCase() || "U"}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg bg-gray-800 p-4 text-white shadow-lg">
                    <h3 className="text-lg font-semibold">{user.STCuser}</h3>
                    <p className="text-sm text-gray-300">{user.STCuserEmail}</p>
                    <p className="text-sm capitalize text-gray-400">
                      {user.STCuserType}
                    </p>
                    <hr className="my-2 border-gray-600" />
                    <button
                      onClick={handleLogout}
                      className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`bg-navy-blue origin-top transform space-y-4 px-4 py-4 transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "scale-100 animate-fade-in-down opacity-100"
            : "hidden scale-95 opacity-0"
        }`}
      >
        <a
          href="/home"
          className="flex justify-center rounded-lg border p-2 text-white hover:text-primary"
        >
          Home
        </a>
        <a
          href="/about-us"
          className="flex justify-center rounded-lg border p-2 text-white hover:text-primary"
        >
          About
        </a>

        {user?.STCuserType === "teacher" && (
          <a
            href="/post-assignments"
            className="flex justify-center rounded-lg border p-2 text-white hover:text-primary"
          >
            Post Assignments
          </a>
        )}
        {user?.STCuserType === "student" && (
          <a
            href="/assignments"
            className="flex justify-center rounded-lg border p-2 text-white hover:text-primary"
          >
            Assignments
          </a>
        )}

        <hr className="border-gray-600" />

        {!user ? (
          <>
            <button
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-left text-white"
              onClick={() => navigate("/create-account")}
            >
              Sign Up
            </button>
            <button
              className="flex w-full items-center justify-center rounded-lg border px-4 py-2 text-left text-white"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </>
        ) : (
          <button
            className="flex w-full items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-left text-white"
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}
