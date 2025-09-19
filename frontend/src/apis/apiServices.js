import axios from "axios";
import { toast } from "react-toastify";

// const API_BASE_URL = "https://we-chat-backend-kappa.vercel.app";
const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message?.includes("Unauthorized") ||
      error.response?.data?.message?.includes("Invalid token")
    ) {
      toast.error("Unauthorized user , please login first");
      localStorage.removeItem("wechatUserToken");
      localStorage.removeItem("wechatUser");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

const getAuthToken = () => localStorage.getItem("wechatUserToken");

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getAuthToken()}` },
});

export const loginApi = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const CreateAccountApi = async (userData) => {
  try {
    const response = await api.post("/auth/create-account", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutApi = async () => {
  try {
    const response = await api.get("/auth/logout", authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchProjectsApi = async () => {
  try {
    const response = await api.get("/project/user-projects", authHeaders());
    return response.data.projects;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createProjectApi = async (projectName) => {
  try {
    const response = await api.post(
      "/project/create",
      { name: projectName },
      authHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllUsersApi = async (projectId) => {
  try {
    const response = await api.post(
      "/auth/all-users-except-current",
      { projectId },
      authHeaders(),
    );
    return response.data.users;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addUserToProjectAPI = async ({ projectId, newUserId }) => {
  try {
    const response = await api.post(
      "/project/add-user",
      { projectId, newUserId },
      authHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProjectDetailsApi = async (projectId) => {
  try {
    const response = await api.get(
      `/project/get-project/${projectId}`,
      authHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
