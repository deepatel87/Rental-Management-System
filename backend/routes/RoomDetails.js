const express = require('express');
const router = express.Router();


const {
    createRoom,
    updateRoom,
    removeTenantFromRoom,
    deleteRoom,
    sendRequest ,
    updateRentStatus
} = require("../controllers/RoomDetails");

router.post("/addRoom", createRoom);
router.post("/updateRoom", updateRoom);
router.post("/removeTenantFromRoom", removeTenantFromRoom);
router.delete("/deleteRoom", deleteRoom);
router.post("/sendRequest", sendRequest);
router.post("/payRent", updateRentStatus);



module.exports = router  