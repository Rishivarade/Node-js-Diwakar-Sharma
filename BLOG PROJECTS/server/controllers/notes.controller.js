const Notesmodel = require("../models/notes.model");

//create notes
const notesCreate = async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: "Please fill in all fields." })
    }
    try {
        console.log(req.user._id)
        await Notesmodel.create({ title, body, userId: req.user._id })
        res.status(200).json({ message: "Note created successfully." })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//delete notes
const notesDelete = async (req, res) => {
    const { notesId } = req.params;

    const isExistNotes = await Notesmodel.findById(notesId)
    console.log(isExistNotes)
    if (!isExistNotes) {
        return res.status(404).json({ error: "Notes not found." })
    }
    if (isExistNotes.userId != req.user?._id) {
        return res.status(400).json({ error: "You are not authorized to delete this note." })
    }
    try {
        await Notesmodel.findByIdAndDelete(notesId)
        res.status(200).json({ message: "Notes deleted successfully." })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//get all user notes
const getNotesbyUser = async (req, res) => {
    const { userId } = req.params
    if (userId != req.user._id) {
        return res.status(400).json({
            error: "You are not authorized to view this note."
        })
    }
    try {
        const notes = await Notesmodel.find({ userId })
        console.log(notes)
        if (!(notes.length) > 0) {
            return res.status(404).json({ error: "No notes found." })
        }
        res.status(200).json({ message: "nots get successfully", notes })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//get specific user notes
const getSpecificUserNotes = async (req, res) => {
    const { notesId } = req.params

    try {
        const isExistNotes = await Notesmodel.findById(notesId)
        if (!isExistNotes) {
            return res.status(400).json({ error: "Notes not found." })
        }
        if (isExistNotes.userId != req.user._id) {
            return res.status(400).json({ error: "You are not authorized to view this note." })
        }
        res.status(200).json({ message: "Notes get successfully", notes: isExistNotes })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//update user notes
const updateNotes = async (req, res) => {
    const { notesId } = req.params;
//   console.log(req.file)

  try {
    const isExistNotes = await Notesmodel.findById(notesId);
    
    if (!isExistNotes) {
      return res.status(400).json({ message: "notes not exist" });
    }

    if (isExistNotes.userId != req.user._id) {
      return res
        .status(400)
        .json({ message: "you have not permission to delete notes" });
    }
    if (req.file) {
      await Notesmodel.findByIdAndUpdate(notesId, {
        ...req.body,
        notesImage: req.file.originalname,
      });
      res.status(200).json({ message: "notes updated successfully" });
    } else {
      await Notesmodel.findByIdAndUpdate(notesId, req.body);
      res.status(200).json({ message: "notes updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

// For Admin

const GetAllNotesByAdmin= async (req, res) => {
    try {
      const AllNotes = await Notesmodel.find();
      console.log(AllNotes)
  
      if (!(AllNotes.length) > 0) {
        return res.status(400).json({ message: "notes not exist" });
      }
  
      res.status(200).json({ message: "notes gets successfully", AllNotes });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  
  const DeleteAllNotesByAdmin = async (req, res) => {
    try {
  
      await Notesmodel.deleteMany({});
  
      res.status(200).json({ message: "notes deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
module.exports = { notesCreate, notesDelete, getNotesbyUser, getSpecificUserNotes, updateNotes,GetAllNotesByAdmin,DeleteAllNotesByAdmin }