import { Router } from "express";
import {
  createAssignment,
  getAssignments,
} from "../controllers/assignment.controllers.js";

const router = Router();

router.post("/create", createAssignment);

router.get("/get-all-assignments", getAssignments);

export default router;
