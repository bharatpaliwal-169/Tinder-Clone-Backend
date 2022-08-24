//imports 
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// routes
import authRoutes from './routes/auth.js';

//basic setups
const app = express();
app.use(bodyParser.json({limit: "50mb",extended : true}));
app.use(bodyParser.urlencoded({limit: "50mb",extended : true}));
app.use(cors());
dotenv.config();


//DB connection
const PORT = process.env.MY_PORT|| process.env.PORT;
const DB_SERVER_URL = process.env.DB_URL;

mongoose.connect(DB_SERVER_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


//INIT
app.get('/',(req, res) => {
  res.send("APP is UP n RUNNING");
});

//authentication
app.use('/auth',authRoutes);
