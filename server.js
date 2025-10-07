const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // new
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res, next) =>{

    res.send('Hello world')
});

app.post("/login", (req, res, next) =>{

    res.send('create successfuly')
});


app.listen(PORT, () => [

    console.log('server is connecting successfuly')
    
]);

