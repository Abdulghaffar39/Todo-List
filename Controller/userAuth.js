const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Abdulghaffar:0PhfX5vXpRUJMFXM@cluster0.d1n4lpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {

        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

function auth(req, res, next){

    res.send('Hello World!!!')
};


async function signup(req, res, next) {
    
    try{

        const { }
    }
}

