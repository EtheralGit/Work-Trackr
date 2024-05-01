// import mongoose model
import Note from "../models/notemodel.js";

export const postNote = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // chech if title are same
    const existTitle = await Note.findOne({
      createdBy,
      title: { $regex: new RegExp(`^${title}$`, "i") },
    });
    if (existTitle) {
      return res.status(400).json({ error: "Title already exists, try again" });
    }

    if (title.length > 24) {
      return res
        .status(400)
        .json({ error: "Title must be less than 24 characters" });
    }

    if (description.length > 1200) {
      return res
        .status(400)
        .json({ error: "Description must be less than 1200 characters" });
    }

    // check how many notes that already have been created by user
    const findNote = await Note.countDocuments({ createdBy });
    if (findNote > 36) {
      return res.status(400).json({
        error:
          "You have reached the maximum limit, please delete some and try again",
      });
    }

    const newNote = new Note({
      createdAt: new Date(),
      createdBy,
      title,
      description,
    });

    if (!newNote) {
      return res.status(400).json({ error: "Please try again" });
    }

    await newNote.save();
    res.status(200).json({ newNote });
  } catch (error) {
    console.log("Error in postNote controllers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllNotes = async (req, res) => {
  const userId = req.user._id;

  const allNotes = await Note.find({ createdBy: userId });

  if (!allNotes)
    return res.status(400).json({ error: "You haven't make any note!" });

  res.status(200).json({ allNotes });
};

export const getSelectedNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    const selectedNote = await Note.findOne({ createdBy: userId, _id: noteId });

    if (!selectedNote) return res.status(400).json({ error: "Note Not Found" });

    res.status(200).json({ selectedNote });
  } catch (error) {
    console.log("Error in getSelectedNote controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const { title, description } = req.body;

    const findNote = await Note.findById(noteId);
    if (!findNote) {
      return res.status(400).json({ error: "Note not found" });
    }

    // Check if the new title is different from the original title
    if (title !== findNote.title) {
      // If different, check if the new title already exists for the user
      const existTitle = await Note.findOne({
        title: title,
        createdBy: userId,
      });
      if (existTitle) {
        return res.status(400).json({ error: "Title already exists" });
      }
    }

    const editedNote = await Note.findOneAndUpdate(
      { _id: noteId, createdBy: userId },
      {
        title: title,
        description: description,
      },
      { new: true }
    );

    if (!editedNote) {
      return res.status(400).json({ error: "Note not found" });
    }

    res.status(200).json({ editedNote });
  } catch (error) {
    console.log("Error in editNote controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      createdBy: userId,
    });

    if (!deletedNote) {
      return res.status(400).json({ error: "Note Not Found" });
    }

    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteNote controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
