const bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
const Usermodel = require("../models/user.model")
const dotenv = require("dotenv")
dotenv.config()

//signup
const signup = async (req, res) => {
    const { name, email, password } = req.body

    if (req.body.role) {
        return res.status(400).josn({ message: "Role can not be send from req.body" })
    }

    if (!name || !email || !password) {
        return res.status(400).send({ message: "Please fill in all fields" })
    }

    try {
        const isUserExists = await Usermodel.findOne({ email })
        if (isUserExists) {
            return res.status(400).send({ message: "Email already exists" })
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).send({ message: "Error hashing password" })
            }
            await Usermodel.create({ name, email, password: hash })
            res.status(200).send({ message: "User created successfully" })
        })


    } catch (error) {
        res.status(400).send({ message: error })
    }

}

//signin
const signin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" })
    }
    const isExistUser = await Usermodel.findOne({ email })
    if (!isExistUser) {
        return res.status(400).json({ message: "Email does not exist please singup" })
    }
    bcrypt.compare(password, isExistUser.password, function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Error comparing password" })
        }
        if (result) {
            const { password, ...rest } = isExistUser._doc
            jwt.sign({ userdata: rest }, process.env.privateKey, function (err, token) {
                if (err) {
                    return res.status(400).json({ message: "Error generating token" })
                }
                return res.cookie("verificationToken",token).status(200).json({ message: "User signin successfully", userdata: rest })
            })
        } else {
            return res.status(400).json({ message: "Password is incorrect" })
        }
    })
}

module.exports = { signup, signin }