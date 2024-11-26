import { Router } from 'express';
import * as fineC from '../controllers/fineC.js';
import a from '../middlewares/auth.js';
import validate from '../middlewares/validate.js'
import v from '../middlewares/fineV.js'

const router = Router();


router.get("/", a.authorizeRole(['inspector', 'admin']), fineC.getF);

router.get("/:fine_id", a.authorizeRole(['driver', 'inspector', 'admin']), v.getFineByIdRules(), validate, fineC.getFI);

router.post('/issue', a.authorizeRole(['admin', 'inspector']), v.issueFineRules(), validate, fineC.issueFine);

router.patch("/pay/:fine_id", a.authorizeRole(['admin']), v.payFineRules(), validate, fineC.payFine);


export default router;