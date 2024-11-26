import { Router } from 'express';
import * as vehicleC from '../controllers/vehicleC.js';
import a from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import v from '../middlewares/vehicleV.js'

const router = Router();


router.get("/", a.authorizeRole(['admin', 'inspector']), vehicleC.getV);

router.get("/information/:patent", a.authorizeRole(['driver', 'inspector', 'admin']), v.getVehicleRules(), validate, vehicleC.getVP);

router.post('/register', a.authorizeRole(['driver', 'inspector', 'admin']), v.registerVehicleRules(), validate, vehicleC.registervehicle);

router.put("/information/:patent", a.authorizeRole(['driver', 'inspector', 'admin']), v.updateVehicleRules(), validate, vehicleC.updateVehicle);

router.delete("/information/:patent", a.authorizeRole(['driver', 'inspector', 'admin']), v.deleteVehicleRules(), validate, vehicleC.deleteVehicle);


export default router;