const express = require("express")
const app = express() 
const cors = require("cors");
require("dotenv").config()
const { cloudinaryConnect } = require("./config/cloudinary");




const dbConnect = require("./config/database") 
dbConnect.connect();
const userRoutes = require("./routes/User")
const adminRoutes = require("./routes/Admin")
const roomRoutes = require("./routes/RoomDetails")
const fileUpload = require("express-fileupload")

 
  
  // Middleware setup
  app.use(express.json());
  app.use(cors({ origin: '*', credentials: true })); 
  app.use(
    fileUpload({
      useTempFiles: true	})
  );
  
  
  cloudinaryConnect();



 
// app.use(cookieParser());

app.use("/api/v1/auth" , userRoutes)
app.use("/api/v1/admin" , adminRoutes)
app.use("/api/v1/room" , roomRoutes)



app.listen(process.env.PORT, () => {
	console.log(`App is listening at ${process.env.PORT}`);
});
 