const app = require('./app')
const dotenv = require('dotenv');
dotenv.config({path: './config.js'});

app.listen(process.env.RUNNING_PORT, ()=> {
    console.log("success Index Run");
})

