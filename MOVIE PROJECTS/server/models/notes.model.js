const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: String,
    body: String,
    genre: { type: String, required: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    notesImage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROlpbROsuLWFnUQWjoTX-rtcoX3__48J66Zw&s"
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const Notesmodel = mongoose.model("movies", movieSchema)
module.exports = Notesmodel;