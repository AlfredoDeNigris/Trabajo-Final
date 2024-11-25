import { Router } from 'express';
import * as userC from '../controllers/userC.js';
import a from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import v from '../middlewares/userV.js'

const router = Router();

router.get("/", a.verify, userC.getU);

router.get("/profile/:user_id", a.verify, v.getUserRules(), validate, userC.getUserProfile);

router.post('/register', v.registerUserRules(), validate, userC.registerUser);

router.put("/profile/:user_id", a.verify, v.updateUserRules(), validate, userC.updateUserProfile);

router.delete("/profile/:user_id", a.verify, v.deleteUserRules(), validate, userC.deleteUserProfile);


export default router;