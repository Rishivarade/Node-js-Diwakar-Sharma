const express = require("express")
const dotenv = require("dotenv")
const connection = require("./config/db")
const userRouter = require("./routes/user.routes")
var cookieParser = require("cookie-parser")
const notesRouter = require("./routes/notes.routes")
dotenv.config()

const cors = require("cors");
const app = express()
app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);


app.use(express.static("./uploads"));
app.use("/notes", notesRouter)
app.use("/user", userRouter)

app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log(`server running on port ${process.env.PORT || 3000}`)
    } catch (error) {
        console.log(error)

    }


})