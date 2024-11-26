import { Router } from 'express';
import * as inspectorC from '../controllers/inspectorC.js';
import a from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import v from '../middlewares/inspectorV.js'


const router = Router();


router.get('/', a.authorizeRole(['admin']), inspectorC.getI);


router.get('/profile/:badge_number', a.authorizeRole(['admin', 'inspector']), v.getInspectorRules(), validate, inspectorC.getIP);


router.post('/register', a.authorizeRole(['admin']), v.createInspectorRules(), validate, inspectorC.create);


router.delete('/profile/:badge_number/:role', a.authorizeRole(['admin']), v.deleteInspectorRules(), validate, inspectorC.deleteInspector);


export default router;