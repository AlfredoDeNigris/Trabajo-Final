import fineDb from '../models/fineM.js';


export const getF = (req, res) => {
    fineDb.getF(req.pool, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};


export const getFI = (req, res) => {
    const fine_id = req.params.fine_id;
    fineDb.getFI(req.pool, fine_id, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const issueFine = (req, res) => {
    const user = req.body;
    fineDb.issueFine(req.pool, user, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const payFine = (req, res) => {
    const fine_id = req.params.fine_id;
    const user = req.body;
    fineDb.payFine(req.pool, fine_id, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};