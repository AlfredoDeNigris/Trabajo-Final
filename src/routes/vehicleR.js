import { Router } from 'express';
import * as vehicleC from '../controllers/vehicleC.js';
import a from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import v from '../middlewares/vehicleV.js'

const router = Router();


router.get("/", a.verify, vehicleC.getV);

router.get("/information/:patent", a.verify, v.getVehicleRules(), validate, vehicleC.getVP);

router.post('/register', a.verify, v.registerVehicleRules(), validate, vehicleC.registervehicle);

router.put("/information/:patent", a.verify, v.updateVehicleRules(), validate, vehicleC.updateVehicle);

router.delete("/information/:patent", a.verify, v.deleteVehicleRules(), validate, vehicleC.deleteVehicle);


export default router;