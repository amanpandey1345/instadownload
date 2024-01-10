const express = require("express");
const cors = require("cors");
const { ndown  } = require("nayan-media-downloader")


const app = express();
app.use(express.json())

app.use(
    cors({
      origin: ["http://localhost:3000", "https://opencodes.vercel.app/"],
    //   credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  var router = express.Router();
app.use("/api/v1",router.post("/inst",async(req,res)=>{
    const {Id} = await req.body
    console.log(Id);
    const {data} = await ndown(`${Id}`)

    res.status(201).json({
        success: true,
        data,
      });
}))
app.use("/",async(req,res)=>{



    res.status(201).json({
        success: true,
      });
})



  

const server = app.listen(4000, ()=>{
    console.log(`Server in running on http://localhost:${"4000"}`);
})    

// unhandled Promise Rejection 
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection `);
    server.close(()=>{
        process.exit(1);
    })
})