const express=require("express")
const {notesCreate, notesDelete, getNotesbyUser, getSpecificUserNotes, updateNotes, GetAllNotesByAdmin, DeleteAllNotesByAdmin} = require("../controllers/notes.controller")
const isAuth = require("../middleware/Auth")
const upload = require("../config/multer")



const movieRouter=express.Router()

//notes
movieRouter.post("/create",isAuth,notesCreate)
movieRouter.delete("/delete/:notesId",isAuth,notesDelete)

//get all notes getting by user
movieRouter.get("/get/:userId",isAuth,getNotesbyUser)
//get notes for specific note
movieRouter.get("/singlenotes/:notesId",isAuth,getSpecificUserNotes)
movieRouter.patch("/update/:notesId",isAuth,upload.single("file"),updateNotes)


module.exports=movieRouter