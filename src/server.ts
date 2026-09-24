import express from 'express'
import { connectMongoDB } from './infrastructure/database/mongo/connection';
import { connectMySQL } from './infrastructure/database/sql/connect';
import userRoutes from '../src/presentation/routes/user.routes'
import authRoutes from '../src/presentation/routes/auth.routes'
import { connectRabbitMQ } from "./infrastructure/messaging/rabbitmq/connection";
import { startUserSyncConsumer } from "./infrastructure/database/sync/userSyncConsumer";
import "reflect-metadata";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
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
        await connectRabbitMQ();
        await startUserSyncConsumer();

        app.listen(5000,()=>{
            console.log('Server running on http://localhost:5000')
        })
    }catch(error){
        console.error(error);
        process.exit(1)
    }
}

startServer();