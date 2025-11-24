const express = require("express");
const router = express.Router();


// Import models
const Task = require("../models/Task");
const Session = require("../models/Session");

// Root route
router.get("/", (req, res) => {
  res.json({
    message: "FocusTools API",
    status: "Running",
    endpoints: {
      tasks: "/api/tasks",
      sessions: "/api/sessions",
    },
  });
});

// TODO: Add your Task routes here
// POST /api/tasks
router.post("/api/tasks", async (req, res) => {
  try {
    
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/tasks
router.get("/api/tasks", async (req, res) => {
   try {
    const tasks = await Task.find();
    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET /api/tasks/:id
router.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// PUT /api/tasks/:id
router.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// DELETE /api/tasks/:id
router.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// TODO: Add your Session routes here
// POST /api/
router.post("/api/sessions", async (req, res) => {
  try {
    
    const newSession= new Session(req.body);
    const savedSession = await newSession.save();

    res.status(201).json(savedSession);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// GET /api/sessions
router.get("/api/sessions", async (req, res) => {
   try {
    const sessions = await Session.find().populate('taskId');
    res.json(sessions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
