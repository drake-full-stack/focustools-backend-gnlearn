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
      tasks: "/tasks",
      sessions: "/sessions",
    },
  });
});

// TODO: Add your Task routes here
// POST /tasks
router.post("/tasks", async (req, res) => {
  try {
    
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /tasks
router.get("/tasks", async (req, res) => {
   try {
    const tasks = await Task.find();
    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET /tasks/:id
router.get("/tasks/:id", async (req, res) => {
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
// PUT /tasks/:id
router.put("/tasks/:id", async (req, res) => {
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
// DELETE /tasks/:id
router.delete("/tasks/:id", async (req, res) => {
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
// POST /
router.post("/sessions", async (req, res) => {
  try {
    
    const newSession= new Session(req.body);
    const savedSession = await newSession.save();

    res.status(201).json(savedSession);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// GET /sessions
router.get("/sessions", async (req, res) => {
   try {
    const sessions = await Session.find().populate('taskId');
    res.json(sessions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
