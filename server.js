const { log } = require('console');
const express = require('express');
const app = express();

const PORT = 3000 || process.env.PORT;

app.use = (express.json());



app.listen(PORT, (req, res, next) => {

    console.log(`Server is running on ${PORT}`);
});
