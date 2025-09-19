import Assignment from "../models/assignment.model.js";

export const createAssignment = async (req, res) => {
  const { title, description, subject, deadline, postedBy } = req.body;

  try {
    const assignment = new Assignment({
      title,
      description,
      subject,
      deadline,
      postedBy,
    });

    await assignment.save();
    res.status(201).json({ message: "Assignment created", assignment });
  } catch (error) {
    console.error("Create assignment error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Get assignments error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
