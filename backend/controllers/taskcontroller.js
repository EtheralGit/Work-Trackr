// import moongose model
import Task from "../models/taskmodel.js";

export const createTask = async (req, res) => {
  try {
    const createdBy = req.user._id;

    const { title, description, category, dueDate } = req.body;

    // check if all fields is filled
    if (!title || !description || !category || !dueDate)
      return res.status(400).json({ error: "Please fill all the fields" });

    // check the number of primary task that created by user
    if (category === "Primary") {
      const primaryTasksCount = await Task.countDocuments({
        createdBy,
        category: "Primary",
      });

      if (primaryTasksCount >= 6) {
        return res.status(400).json({
          error: "You have reached the maximum limit of primary task!",
        });
      }
    }

    // check the number of primary task that created by user
    const secondaryTasksCount = await Task.countDocuments({
      createdBy,
      category: "Secondary",
    });

    if (secondaryTasksCount >= 30) {
      return res.status(400).json({
        error: "You have reached the maximum limit of secondary task!",
      });
    }

    // chech if title are same
    const existTitle = await Task.findOne({
      createdBy,
      title: { $regex: new RegExp(`^${title}$`, "i") },
    });
    if (existTitle) {
      return res.status(400).json({ error: "Title already exists, try again" });
    }

    // check if the title & description is too long
    if (title.length > 40)
      return res
        .status(400)
        .json({ error: "Title must be less than 26 characters" });

    if (description.length > 1200)
      return res
        .status(400)
        .json({ error: "Description must be less than 250 characters" });

    // check is the dueDate is wrong
    const currentDate = new Date();
    if (new Date(dueDate) < currentDate) {
      return res.status(400).json({ error: "Due date cannot be in the past" });
    }

    const newTask = new Task({
      createdBy,
      title,
      description,
      category,
      dueDate,
    });

    if (newTask) {
      await newTask.save();
      res.status(201).json({
        createdBy: newTask.createdBy,
        Title: newTask.title,
        Description: newTask.description,
        category: newTask.category,
        dueDate: newTask.dueDate,
      });
    } else {
      res.status(400).json({ error: "Error in build newtask" });
    }
  } catch (error) {
    console.log("Error in createTask controller: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getPrimaryTask = async (req, res) => {
  try {
    const userId = req.user._id;

    const primaryTasks = await Task.find({
      createdBy: userId,
      category: "Primary",
    });

    if (!primaryTasks)
      return res
        .status(400)
        .json({ error: "You didn't have any primary task!" });

    res.status(200).json({ primaryTasks });
  } catch (error) {
    console.log("Error in getPrimaryTask controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSecondaryTask = async (req, res) => {
  try {
    const userId = req.user._id;

    const secondaryTasks = await Task.find({
      createdBy: userId,
      category: "Secondary",
    });

    if (secondaryTasks.length === 0)
      return res
        .status(400)
        .json({ error: "You didn't have any secondary task!" });

    res.status(200).json({ secondaryTasks });
  } catch (error) {
    console.log("Error in getSecondaryTask controller: ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getSelectedTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const selectedTasks = await Task.findOne({
      _id: taskId,
      createdBy: userId,
    });
    if (!selectedTasks)
      return res.status(400).json({ message: "Task Not Found" });

    res.status(200).json({ selectedTasks });
  } catch (error) {
    console.log("Error in getSelectedTask controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
