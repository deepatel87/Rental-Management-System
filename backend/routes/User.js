const express =  require("express")
const passport = require('passport');
const app = express()

const router= express.Router() 

const {
    login , signUp , sendOTP 
}  = require ("../controllers/Auth")
 

router.post("/login" , login)
router.post("/signup" , signUp)
router.post("/sendOTP" , sendOTP)
;




module.exports = router ;  