const express = require('express');
const router = express.Router();
const timeTableCtl = require('../controllers/timeTable.controller');
const auth = require('../middleware/auth')

router.post('/add', timeTableCtl.addSlot);
router.delete('/delete', timeTableCtl.deleteSlot);
router.put('/update', timeTableCtl.updateSlot);
router.post('/getSlots', timeTableCtl.getSlots);


module.exports = router;