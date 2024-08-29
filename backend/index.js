const express = require("express")
const app = express() 
const cors = require("cors");
const cronJobs = require('./cronJobs'); 

require("dotenv").config()



const dbConnect = require("./config/database") 
dbConnect.connect();
const userRoutes = require("./routes/User")
const adminRoutes = require("./routes/Admin")
const roomRoutes = require("./routes/RoomDetails")

 
  
  app.use(express.json());
  app.use(cors({ origin: '*', credentials: true })); 




 
// app.use(cookieParser());

app.use("/api/v1/auth" , userRoutes)
app.use("/api/v1/admin" , adminRoutes)
app.use("/api/v1/room" , roomRoutes)



app.listen(process.env.PORT, () => {
	console.log(`App is listening at ${process.env.PORT}`);
});
 