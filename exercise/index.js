// [!] REST API with ExpressJs framework

const express = require('express');
const PORT = 2000;

const app = express();

// agar express bisa nangkep body
app.use(express.json())

// server testing
app.listen(PORT, () => {
    console.log("Hi there!");
    console.log(`server started on port: ${PORT}`);
})

// 
const { expenseRouter } = require('./routers')
app.use("/expense", expenseRouter)