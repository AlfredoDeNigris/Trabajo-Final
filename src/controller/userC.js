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

export default router;
/*
app.get("/profile/:client_id", security.verify,
    [
        check('client_id').isNumeric().withMessage('Client ID must be a number')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const client_id = req.params.client_id;
        userDb.getCP(req.pool, client_id, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

app.post('/register',
    [
        check('full_name')
            .isString().withMessage('Full name must be a string')
            .matches(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑçÇ\s]+$/).withMessage('Full name contains invalid characters.'),
        check('username')
            .notEmpty().withMessage('Username is required'),
        check('password')
            .notEmpty().withMessage('Password is required'),
        check('billing_address')
            .notEmpty().withMessage('Billing address is required'),
        check('phone_number')
            .isNumeric().withMessage('Phone number must be numeric'),
        check('email')
            .isEmail().withMessage('Invalid email address')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const client = req.body;
        userDb.create(req.pool, client, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

app.put("/profile/:client_id", security.verify,
    [
        check('full_name')
            .isString().withMessage('Full name must be a string')
            .matches(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑçÇ\s]+$/).withMessage('Full name contains invalid characters.'),
        check('username')
            .notEmpty().withMessage('Username is required'),
        check('password')
            .notEmpty().withMessage('Password is required'),
        check('billing_address')
            .notEmpty().withMessage('Billing address is required'),
        check('phone_number')
            .isNumeric().withMessage('Phone number must be numeric'),
        check('email')
            .isEmail().withMessage('Invalid email address')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const client_id = req.params.client_id;
        const client = req.body;
        userDb.update(req.pool, client_id, client, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

app.delete("/profile/:client_id", security.verify,
    [
        check('client_id').isNumeric().withMessage('Client ID must be a number')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const client_id = req.params.client_id;
        userDb.delete(req.pool, client_id, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);*/


