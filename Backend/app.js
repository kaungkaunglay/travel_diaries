import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import userRouter from './routing/user-routes';
import postRouter from './routing/post-route';
import cors from 'cors'; 
const app = express(); 
dotenv.config();
app.use(cors());
// middleware
app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);


// connection to mongodb 
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.dokp1jy.mongodb.net/?retryWrites=true&w=majority`) 
.then(() =>  app.listen(5000, () => console.log('Connection successfull & listen to localhost port 5000')))
.catch((err) => console.log(err));

