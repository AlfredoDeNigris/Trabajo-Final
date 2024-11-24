import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import db from '../config/connectionConfig.js';
import userDb from '../model/userM.js';
//import security from './securityC.js';

const router = Router();


router.get("/", /*security.verify,*/(req, res) => {
    userDb.getU(db, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
});

router.get("/profile/:user_id", /*security.verify,*/
    [
        check('user_id').isNumeric().withMessage('User ID must be a number')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user_id = req.params.user_id;
        userDb.getUP(req.pool, user_id, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

router.post('/register',
    [
        check('full_name')
            .isString().withMessage('Full name must be a string')
            .matches(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑçÇ\s]+$/).withMessage('Full name contains invalid characters.'),
        check('license')
            .notEmpty().withMessage('License is required'),
        check('date_birth')
            .notEmpty().withMessage('Date of birth is required'),
        check('password')
            .notEmpty().withMessage('Password is required'),
        check('billing_address')
            .notEmpty().withMessage('Billing address is required'),
        check('phone_number')
            .isNumeric().withMessage('Phone number must be a number'),
        check('email')
            .isEmail().withMessage('Invalid email address')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = req.body;
        userDb.create(req.pool, user, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

router.put("/profile/:user_id", /*security.verify,*/
    [
        check('user_id')
            .isNumeric().withMessage('User ID must be a number'),
        check('full_name')
            .isString().withMessage('Full name must be a string')
            .matches(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑçÇ\s]+$/).withMessage('Full name contains invalid characters.'),
        check('license')
            .notEmpty().withMessage('License is required'),
        check('date_birth')
            .notEmpty().withMessage('Date of birth is required'),
        check('password')
            .notEmpty().withMessage('Password is required'),
        check('billing_address')
            .notEmpty().withMessage('Billing address is required'),
        check('phone_number')
            .isNumeric().withMessage('Phone number must be a number'),
        check('email')
            .isEmail().withMessage('Invalid email address')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user_id = req.params.user_id;
        const user = req.body;
        userDb.update(req.pool, user_id, user, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

router.delete("/profile/:user_id", /*security.verify,*/
    [
        check('user_id').isNumeric().withMessage('user ID must be a number')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user_id = req.params.user_id;
        userDb.delete(req.pool, user_id, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

export default router;