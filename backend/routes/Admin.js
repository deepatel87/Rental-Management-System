const express = require('express');
const router = express.Router();

const {addAdmin , acceptRequest , rejectRequest , removeTenant} = require("../controllers/Admin")

router.post("/addAdmin" ,addAdmin)
router.post("/acceptRequest" ,acceptRequest)
router.post("/rejectRequest" ,rejectRequest)
router.post("/removeTenant" ,removeTenant)
module.exports = router  
 