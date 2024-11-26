import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { createJWT, verifyJWT, ExpiredTokenError, InvalidTokenError } from '../utils/tokenGenerator.js';
import u from '../utils/utilities.js';
import userDb from '../models/userM.js';
import dotenv from 'dotenv';


dotenv.config();
const entity = "user";

function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    userDb.getUF(req.pool, username, (err, result) => {
        try {
            if (!result || !result.result || result.result.length === 0) {
                return res.status(404).send({
                    message: `No registered user found with the entered search criteria`
                });
            }

            const user = result.result[0];
            const same = bcrypt.compareSync(password, user.password);

            if (same) {
                const userPayload = {
                    full_name: user.full_name,
                    license: user.license,
                    date_birth: user.date_birth,
                    billing_address: user.billing_address,
                    phone_number: user.phone_number,
                    email: user.email,
                    user_id: user.user_id,
                    role: user.role
                };

                const header = { alg: 'HS256', typ: 'JWT' };
                const payload = {
                    ...userPayload,
                    exp: Math.floor(Date.now() / 1000) + (72 * 60 * 60) //Set expiration to 72 hours
                };

                const token = createJWT(header, payload, process.env.JWT_SECRET);
                res.json({
                    data: userPayload,
                    token: token
                });
            } else {
                res.status(403).send({
                    message: 'Either the name or password is incorrect'
                });
            }
        } catch (err) {
            u.globalError(req.pool, (errorResponse) => res.status(errorResponse.status).json(errorResponse), err, null, entity);
        }
    });
}



function authorizeRole(allowedRoles, restrictToOwnId = false) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Authorization token is required' });
            }

            const token = authHeader.split(' ')[1];
            const payload = verifyJWT(token, process.env.JWT_SECRET);

            if (!allowedRoles.includes(payload.role)) {
                return res.status(403).json({ error: 'Access forbidden: insufficient privileges' });
            }

            if (restrictToOwnId && payload.role === 'driver') {
                const userIdFromRequest = req.params.user_id || req.body.user_id;

                if (!userIdFromRequest || userIdFromRequest !== String(payload.user_id)) {
                    return res.status(403).json({
                        error: 'Access forbidden: insufficient privileges',
                    });
                }
            }

            req.user = payload;
            next();
        } catch (error) {
            if (error instanceof ExpiredTokenError) {
                return res.status(401).json({ error: 'Token has expired' });
            } else if (error instanceof InvalidTokenError) {
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                return res.status(500).json({ error: 'An error occurred during authorization' });
            }
        }
    };
};


const a = {
    login,
    authorizeRole,
};

export default a;