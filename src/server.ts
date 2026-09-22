import express from 'express'
import { connectMongoDB } from './infrastructure/database/mongo/connection';
import { connectMySQL } from './infrastructure/database/sql/connect';

const app = express();

app.use(express.json());

app.use("/",(req,res)=>{
    res.json({
        success:true,
        message:'server started'
    })
})

const startServer=async ()=>{
    try{
        await connectMongoDB();
        await connectMySQL();

        app.listen(5000,()=>{
            console.log('Server running on http://localhost:5000')
        })
    }catch(error){
        console.error(error);
        process.exit(1)
    }
}

startServer();