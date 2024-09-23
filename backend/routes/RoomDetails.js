const express = require('express');
const router = express.Router();


const {
    createRoom,
    removeTenantFromRoom,
    deleteRoom,
    updateRentStatus
} = require("../controllers/RoomDetails");

router.post("/addRoom", createRoom);
router.post("/removeTenantFromRoom", removeTenantFromRoom);
router.delete("/deleteRoom", deleteRoom);
router.post("/payRent", updateRentStatus);



module.exports = router  