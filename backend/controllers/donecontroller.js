// import mongoose model
import Done from "../models/donemodel.js";
import Task from "../models/taskmodel.js";
// utils
import { moveExpiresTasks } from "../utils/scheduler.js";

export const moveTasks = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: taskId, createdBy: userId });

    if (!task) return res.status(400).json({ error: "Task Not Found" });

    const { createdBy, title, description, category, createdAt } = task;

    // check if the title are same
    const sameTitle = await Done.findOne({ createdBy: userId, title: title });

    if (sameTitle) {
      return res.status(400).json({
        error:
          "You can't completed if the title are same, please delete first the same title in done section",
      });
    }

    // check the number of task that has been done by user
    if (task.category === "Primary") {
      const primaryDoneCount = await Done.countDocuments({
        category: "Primary",
        createdBy,
      });

      if (primaryDoneCount >= 12) {
        return res.status(400).json({
          error:
            "You have reach the maximum limit of saving to primary done, please delete some and try again",
        });
      }
    } else {
      const secondaryDoneCount = await Done.countDocuments({
        createdBy,
        category: "Secondary",
      });

      if (secondaryDoneCount >= 24) {
        return res.status(400).json({
          error:
            "You have react the maximum limit of saving to secondary done, please delete some and try again",
        });
      }
    }

    const completedTask = new Done({
      createdBy,
      title,
      description,
      category,
      createdAt,
      completedAt: new Date(),
    });

    await completedTask.save();

    // delete task from Task model
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      createdAt: completedTask.createdAt,
      createdBy: completedTask.createdBy,
      completedAt: completedTask.completedAt,
      title: completedTask.title,
      description: completedTask.description,
      category: completedTask.category,
    });
  } catch (error) {
    console.log("Error in moveTasks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const autoMoveTaks = async (req, res) => {
  try {
    await moveExpiresTasks();
    res.status(200).json({ message: "Expired tasks moved successfully" });
  } catch (error) {
    console.error("Error moving expired tasks", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

setInterval(moveExpiresTasks, 3600000);

export const getPrimaryDoneTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const primaryDone = await Done.find({
      createdBy: userId,
      category: "Primary",
    });

    if (!primaryDone)
      return res
        .status(400)
        .json({ error: "You haven't done any primary tasks" });

    res.status(200).json({ primaryDone });
  } catch (error) {
    console.log("Error in getPrimaryDoneTasks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSecondaryDoneTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const secondaryDone = await Done.find({
      createdBy: userId,
      category: "Secondary",
    });

    if (!secondaryDone)
      return res
        .status(400)
        .json({ error: "You haven't done any secondary taks" });

    return res.status(200).json({ secondaryDone });
  } catch (error) {
    console.log("Error in getSecondaryDoneTaks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSelectedDone = async (req, res) => {
  try {
    const doneId = req.params.id;
    const userId = req.user._id;

    const selectedDone = await Done.findOne({
      _id: doneId,
      createdBy: userId,
    });

    if (!selectedDone) return res.status(400).json({ error: "Task Not Found" });

    res.status(200).json({ selectedDone });
  } catch (error) {
    console.log("Error in getSelectedDone: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSelectedDone = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const userId = req.user._id;

    const DeleteDone = await Done.findOneAndDelete({
      _id: deleteId,
      createdBy: userId,
    });

    if (!DeleteDone) {
      return res.status(400).json({ error: "Task Not Found" });
    }

    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    console.log("Error in deleteSelectedDone: ", error.message);
  }
};
