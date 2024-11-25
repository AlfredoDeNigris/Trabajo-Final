import userDb from '../models/userM.js';


export const getU = (req, res) => {
    userDb.getU(req.pool, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};


export const getUserProfile = (req, res) => {
    const user_id = req.params.user_id;
    userDb.getUP(req.pool, user_id, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const registerUser = (req, res) => {
    const user = req.body;
    userDb.create(req.pool, user, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const updateUserProfile = (req, res) => {
    const user_id = req.params.user_id;
    const user = req.body;
    userDb.update(req.pool, user_id, user, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const deleteUserProfile = (req, res) => {
    const user_id = req.params.user_id;
    userDb.delete(req.pool, user_id, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};