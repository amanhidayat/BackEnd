var cors = require('cors')
const express = require('express')
const PORT = 2000

const app = express()
app.use(express.json())
app.use(cors())

// app.get("/api", (req, res) => {
//     res.send("This is my API")
// }) 

// app.post("/api", (req, res) => {
//     console.log(req.body)
//     res.send('This is my post API')
// })


const { userRouter } = require('./routers') 
app.use("/users", userRouter)

app.listen(PORT, ()=> {
    console.log(`Server untuk port: ${PORT}`)
})