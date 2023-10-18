const express = require('express');
const PORT = 2000;

const app = express();
app.use(express.json());

const db = require('./database');

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("mysql connected");
    }
});

const { studentRouter} = require('./routers'); // Perbaikan nama variabel dan penggantian tanda titik (.) menjadi underscore (_) jika diperlukan
app.use("/students",studentRouter );

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
