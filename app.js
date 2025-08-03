const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./src/routes/api.js');
const bodyParser = require('body-parser');

// security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');

// security implementation
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(hpp());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
})

app.use(limiter)
// BodyParser Implement
app.use(bodyParser.json());

// connection mongoose
const dotenv = require('dotenv');
dotenv.config({ path: './config.js'});

let URI = process.env.MongoURL;
let OPTION = { user: '', pass: '', autoIndex: true }; 
// here must use autoIndex for mongoose index unique value

mongoose.connect(URI, OPTION)
  .then(() => {
    console.log("MongoDB connection success");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routing Implement
app.use('/api/v1', router)
// Undefined Route Implement
app.use((req, res) => {
  res.status(404).json({ status: "Failed", data: "Not Found" });
});
// multer form data
app.use('/uploads', express.static('uploads'));
// connect to express with frontend
// app.use(express.static(path.resolve(__dirname, 'client', 'dist')));
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

module.exports = app;