import Done from "../models/donemodel.js";
import Task from "../models/taskmodel.js";

export const moveExpiresTasks = async () => {
  try {
    const expiredTasks = await Task.find({ dueDate: { $lt: new Date() } });

    if (expiredTasks.length > 0) {
      for (const task of expiredTasks) {
        const { createdBy, createdAt, title, description, category } = task;

        const completedTask = new Done({
          createdBy,
          createdAt,
          title,
          description,
          category,
          completedAt: new Date(),
        });

        await completedTask.save();

        await Task.findByIdAndDelete(task._id);
      }

      console.log("Expired task moved to Done model successfully");
    } else {
      console.log("No expires task found");
    }
  } catch (error) {
    console.log("Error in scheduler: ", error.message);
  }
};

setInterval(moveExpiresTasks, 3600000);
