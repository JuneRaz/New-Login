const express =require('express');
const router =express.Router();

const {SetDevices}= require('../controllers/setdevice')


router.post('/setdevices', SetDevices)

const setdeviceRoute =router;
module.exports = setdeviceRoute;