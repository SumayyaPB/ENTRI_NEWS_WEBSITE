import express from 'express'
import cors from 'cors'
import userRouter from './Router/userRouter.js';
import employeeRouter from './Router/employeeRouter.js';
import  postRouter  from './Router/postRouter.js';
import path from 'path'
import mongoose from 'mongoose'
import 'dotenv/config'

const app=express()

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}
main();
 
app.use(express.json());
app.use(cors())
app.use('/users', userRouter)
app.use('/employers',employeeRouter)
app.use('/posts',postRouter)

const dirname = path.resolve()
app.use(express.static(path.join(dirname,'uploads')))


app.listen(3000,()=>{
    console.log('Listening on port 3000');
})





