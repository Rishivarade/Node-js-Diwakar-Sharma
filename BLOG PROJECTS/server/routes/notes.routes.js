const express=require("express")
const {notesCreate, notesDelete, getNotesbyUser, getSpecificUserNotes, updateNotes, GetAllNotesByAdmin, DeleteAllNotesByAdmin} = require("../controllers/notes.controller")
const isAuth = require("../middleware/Auth")
const upload = require("../config/multer")
const isAdmin = require("../middleware/Admin")


const notesRouter=express.Router()

//notes
notesRouter.post("/create",isAuth,notesCreate)
notesRouter.delete("/delete/:notesId",isAuth,notesDelete)

//get all notes getting by user
notesRouter.get("/get/:userId",isAuth,getNotesbyUser)
//get notes for specific note
notesRouter.get("/singlenotes/:notesId",isAuth,getSpecificUserNotes)
notesRouter.patch("/update/:notesId",isAuth,upload.single("file"),updateNotes)

//Admin Routes
notesRouter.get("/getallnotes", isAuth, isAdmin, GetAllNotesByAdmin)
notesRouter.delete("/deleteallnotes", isAuth, isAdmin, DeleteAllNotesByAdmin)

module.exports=notesRouter