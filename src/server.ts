import express from 'express'

const app = express();

app.use(express.json());

app.use("/",(req,res)=>{
    res.json({
        success:true,
        message:'server started'
    })
})

app.listen(5000,()=>{
    console.log('Server running on http://localhost:5000')
})
