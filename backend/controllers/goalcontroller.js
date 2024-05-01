// import mongoose model
import Goal from "../models/goalmodel.js";

export const createGoal = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, text, completedAt } = req.body;

    if (!title || !text || !completedAt) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // check if the title is already exists
    const existTitle = await Goal.findOne({
      createdBy: userId,
      title: { $regex: new RegExp(`^${title}$`, "i") },
    });
    if (existTitle) {
      return res
        .status(400)
        .json({ error: "Title already exists, try again using different" });
    }

    // check the total goal that user created
    const totalGoals = await Goal.find({ createdBy: userId });
    if (totalGoals.length > 4) {
      return res.status(400).json({
        error:
          "You have reached the maximum limit of creating goals, please delete some and try again",
      });
    }

    // check if title && text is too long
    if (title.length > 42) {
      return res
        .status(400)
        .json({ error: "Title must be less than 42 characters" });
    }
    if (text.length > 500) {
      return res
        .status(400)
        .json({ error: "Text must be less than 500 characters" });
    }

    const newGoal = new Goal({
      createdBy: userId,
      title,
      text,
      createdAt: new Date(),
      completedAt,
    });
    if (newGoal) {
      await newGoal.save();
      return res.status(201).json(newGoal);
    }
  } catch (error) {
    console.log("Error in createGoal controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllGoals = async (req, res) => {
  try {
    const userId = req.user._id;

    const allGoals = await Goal.find({ createdBy: userId });
    if (!allGoals) {
      return res.status(400).json({ error: "You haven't write any goals!" });
    }

    res.status(200).json(allGoals);
  } catch (error) {
    console.log("Error in getAllGoals controller: ", error.message);
  }
};

export const getSelectedGoal = async (req, res) => {
  try {
    const userId = req.user._id;
    const goalId = req.params.id;

    const selectedGoal = await Goal.findOne({ createdBy: userId, _id: goalId });
    if (!selectedGoal) {
      return res.status(400).json({ error: "Goal Not Found" });
    }

    res.status(200).json({ selectedGoal });
  } catch (error) {
    console.log("Error in getSelectedGoal controller: ", error.message);
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const userId = req.user._id;
    const goalId = req.params.id;

    const deleteGoal = await Goal.findOneAndDelete({
      createdBy: userId,
      _id: goalId,
    });
    if (!deleteGoal) {
      return res.status(400).json({ error: "Goal Not Found" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("Error in getSelectedGoal controller: ", error.message);
  }
};
