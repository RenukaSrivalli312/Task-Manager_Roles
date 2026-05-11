const Task = require("../models/Task");
const User = require("../models/User");

// ─── @route   GET /api/tasks ──────────────────────────────────────────────────
// ─── @access  Private (Admin: all tasks | User: only assigned tasks) ──────────
const getTasks = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // Admin sees ALL tasks with assigned user info populated
      tasks = await Task.find()
        .populate("assignedTo", "name email")   // replace ObjectId with name+email
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });               // newest first
    } else {
      // Regular user sees ONLY tasks assigned to them
      tasks = await Task.find({ assignedTo: req.user._id })
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   GET /api/tasks/:id ─────────────────────────────────────────────
// ─── @access  Private ─────────────────────────────────────────────────────────
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    // Users can only view their own assigned tasks
    if (
      req.user.role !== "admin" &&
      String(task.assignedTo?._id) !== String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this task.",
      });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// ─── @route   POST /api/tasks ─────────────────────────────────────────────────
// ─── @access  Private — Admin only ───────────────────────────────────────────
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, assignedTo, dueDate, priority } = req.body;

    // ── Validate required fields ──────────────────────────────────────────────
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    // ── If assignedTo is provided, verify the user exists ────────────────────
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(404).json({
          success: false,
          message: "Assigned user not found. Please provide a valid user ID.",
        });
      }
    }

    // ── Create the task ───────────────────────────────────────────────────────
    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      priority: priority || "medium",
      dueDate: dueDate || null,
      assignedTo: assignedTo || null,
      createdBy: req.user._id,
    });

    // Populate after creation so response includes user details
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   PUT /api/tasks/:id ─────────────────────────────────────────────
// ─── @access  Private ─────────────────────────────────────────────────────────
//   Admin → can update everything (title, description, status, assignedTo)
//   User  → can ONLY update status of their assigned tasks
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    if (req.user.role === "admin") {
      // ── Admin: full update ──────────────────────────────────────────────────
      const { title, description, status, assignedTo, dueDate, priority } = req.body;

      // If reassigning, verify the new user exists
      if (assignedTo) {
        const assignedUser = await User.findById(assignedTo);
        if (!assignedUser) {
          return res.status(404).json({
            success: false,
            message: "Assigned user not found.",
          });
        }
        task.assignedTo = assignedTo;
      }

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (priority !== undefined) task.priority = priority;
      if (dueDate !== undefined) task.dueDate = dueDate || null;

    } else {
      // ── Regular user: can ONLY update status of their own task ──────────────
      if (String(task.assignedTo) !== String(req.user._id)) {
        return res.status(403).json({
          success: false,
          message: "You can only update tasks that are assigned to you.",
        });
      }

      const { status } = req.body;
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "As a user, you can only update the task status.",
        });
      }

      const validStatuses = ["pending", "in-progress", "completed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
        });
      }

      task.status = status;
    }

    await task.save();
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   DELETE /api/tasks/:id ──────────────────────────────────────────
// ─── @access  Private — Admin only ───────────────────────────────────────────
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
