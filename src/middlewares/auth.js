import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { createJWT, verifyJWT, ExpiredTokenError, InvalidTokenError } from '../utils/tokenGenerator.js';
import u from '../utils/utilities.js';
import userDb from '../models/userM.js';

const entity = "user";


function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { full_name, password } = req.body;

    userDb.getUF(req.pool, full_name, (err, result) => {
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
                    user_id: user.user_id
                };

                const header = { alg: 'HS256', typ: 'JWT' };
                const payload = {
                    ...userPayload,
                    exp: Math.floor(Date.now() / 1000) + (72 * 60 * 60) //Set expiration to 72 hours
                };

                const token = createJWT(header, payload, 'secret');
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


function verify(req, res, next) {
    const token = req.headers["token"];

    if (token) {
        try {
            const verifiedPayload = verifyJWT(token, "secret");

            if (verifiedPayload) {
                req.user = verifiedPayload;
                next();
            } else {
                res.status(403).send({
                    message: "Invalid token, permission denied"
                });
            }
        } catch (error) {
            if (error instanceof ExpiredTokenError) {
                res.status(403).send({ message: "Token has expired" });
            } else if (error instanceof InvalidTokenError) {
                res.status(403).send({ message: "Invalid token" });
            } else {
                res.status(403).send({ message: "Access Denied" });
            }
        }
    } else {
        res.status(403).send({
            message: "No authorization token"
        });
    }
};

const a = {
    login,
    verify,
};

export default a;