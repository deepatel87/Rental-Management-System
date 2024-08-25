const express = require("express")
const app = express() 
const cors = require("cors");
require("dotenv").config()



const dbConnect = require("./config/database") 
dbConnect.connect();
const userRoutes = require("./routes/User")

 
  
  // Middleware setup
  app.use(express.json());
  app.use(cors({ origin: '*', credentials: true })); 




 
// app.use(cookieParser());

app.use("/api/v1/auth" , userRoutes)



app.listen(process.env.PORT, () => {
	console.log(`App is listening at ${process.env.PORT}`);
});
 