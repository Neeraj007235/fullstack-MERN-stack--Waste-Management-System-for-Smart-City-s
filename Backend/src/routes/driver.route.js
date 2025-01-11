import express from 'express';
import { createDriver,getAllDrivers, login, logout ,updateDriver,deleteDriver,getDriverByEmail } from "../controllers/driver.controller.js"
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/drivers',protect("admin"), createDriver);
router.get('/drivers',protect("admin"), getAllDrivers);
router.post("/drivers/login", login)
router.post("/drivers/logout", logout)
router.get("/drivers/email/:email",protect("driver"), getDriverByEmail); 
router.put('/drivers/:id',protect("admin"), updateDriver);
router.delete('/drivers/:id',protect("admin"), deleteDriver);

export default router;
