import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import db from '../config/connectionConfig.js';
import inspectorDb from '../model/inspectorM.js';
//import security from './securityC.js';

const router = Router();


router.get("/", /*security.verify,*/(req, res) => {
    inspectorDb.getI(db, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
});

router.get("/profile/:badge_number", /*security.verify,*/
    [
        check('badge_number').isNumeric().withMessage('Badge number must be a number')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const badge_number = req.params.badge_number;
        inspectorDb.getIP(req.pool, badge_number, (err, result) => {
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
            .isEmail().withMessage('Invalid email address'),
        check('role')
            .equals('inspector').withMessage('Invalid role')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const inspector = req.body;
        inspectorDb.create(req.pool, inspector, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

router.delete("/profile/:badge_number/:role", /*security.verify,*/
    [
        check('badge_number').isNumeric().withMessage('Badge number must be a number'),
        check('role')
            .isString().withMessage('Role must be a string')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const badge_number = req.params.badge_number;
        const role = req.params.role;
        inspectorDb.delete(req.pool, badge_number, role, (err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
);

export default router;