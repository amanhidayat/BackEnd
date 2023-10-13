const express = require('express')
const PORT = 2000 

const app = express()
// agar express bisa nerima body
app.use(express.json())

app.get("/api", (req, res) => {
    res.send("This is my API paman syam")
})

const { userRouter } = require('./routers')

app.use("/user", userRouter)

/* app.post("/post", (req, res) => {
    console.log(req.body);
    res.send("This is my API Method POST")
}) */


 /* app.get("/bisa", (req, res) => {
    res.send(data)
}) */



app.listen(PORT, () => {
    console.log(`Server runnint on port: ${PORT}`)
})


