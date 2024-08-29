const express = require('express');
const router = express.Router();

const {addAdmin , acceptRequest , rejectRequest} = require("../controllers/Admin")

router.post("/addAdmin" ,addAdmin)
router.post("/acceptRequest" ,acceptRequest)
router.post("/rejectRequest" ,rejectRequest)
module.exports = router  
 