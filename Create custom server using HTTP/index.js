const http =require("http");


const fs = require("fs");


const server =http.createServer((req, res) => {
    if (req.url == "/home") {
        res.end("Welcome to Homepage")
    } else if (req.url == "/about") {
        res.end("Welcome to About Page")
    } else if (req.url == "/getproductdata") {

        //read data fs module
        fs.readFile("./db.json", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                //parse data
                const { products } = JSON.parse(data)
                res.end(JSON.stringify(products))
            }
        })
    } else if (req.url == "/user") {

        //read data fs module
        fs.readFile("./db.json", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                //parse data
                const { user } = JSON.parse(data)
                res.end(JSON.stringify(user))
            }
        })
    }
})



server.listen(8008, () => {
    console.log("server is running on port 8008")
})

