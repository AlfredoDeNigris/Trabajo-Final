import { Router } from 'express';
import * as userC from '../controllers/userC.js';
import a from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import v from '../middlewares/userV.js'

const router = Router();

router.get("/", a.authorizeRole(['admin', 'inspector']), userC.getU);

router.get("/profile/:user_id", a.authorizeRole(['driver', 'inspector', 'admin'], true), v.getUserRules(), validate, userC.getUserProfile);

router.post('/register', v.registerUserRules(), validate, userC.registerUser);

router.put("/profile/:user_id", a.authorizeRole(['driver', 'inspector', 'admin'], true), v.updateUserRules(), validate, userC.updateUserProfile);

router.delete("/profile/:user_id", a.authorizeRole(['driver', 'inspector', 'admin'], true), v.deleteUserRules(), validate, userC.deleteUserProfile);


export default router;