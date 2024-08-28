const express = require('express');
const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendOTP", sendOTP);

const {
    createRoom,
    updateRoom,
    removeTenantFromRoom,
    deleteRoom,
    sendRequest
} = require("../controllers/RoomDetails");

router.post("/createRoom", createRoom);
router.post("/updateRoom", updateRoom);
router.post("/removeTenantFromRoom", removeTenantFromRoom);
router.post("/deleteRoom", deleteRoom);
router.post("/sendRequest", sendRequest);

module.exports = router;
