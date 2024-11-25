import { Router } from 'express';
import * as inspectorC from '../controllers/inspectorC.js';
import a from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import v from '../middlewares/inspectorV.js'


const router = Router();


router.get('/', a.verify, inspectorC.getI);


router.get('/profile/:badge_number', a.verify, v.getInspectorRules(), validate, inspectorC.getIP);


router.post('/register', a.verify, v.createInspectorRules(), validate, inspectorC.create);


router.delete('/profile/:badge_number/:role', a.verify, v.deleteInspectorRules(), validate, inspectorC.deleteInspector);


export default router;