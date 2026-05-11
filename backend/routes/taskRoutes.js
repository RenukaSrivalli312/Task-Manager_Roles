const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// All task routes require the user to be logged in
router.use(protect);

// GET  /api/tasks     — Admin: all tasks | User: only assigned tasks
router.get("/", getTasks);

// GET  /api/tasks/:id — Get a single task by ID
router.get("/:id", getTaskById);

// POST /api/tasks     — Admin only: create a task
router.post("/", authorizeRoles("admin"), createTask);

// PUT  /api/tasks/:id — Admin: full update | User: status update only
router.put("/:id", updateTask);

// DELETE /api/tasks/:id — Admin only: delete a task
router.delete("/:id", authorizeRoles("admin"), deleteTask);

module.exports = router;
