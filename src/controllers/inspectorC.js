import inspectorDb from '../models/inspectorM.js';

export const getI = (req, res) => {
    inspectorDb.getI(req.pool, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const getIP = (req, res) => {
    const badge_number = req.params.badge_number;
    inspectorDb.getIP(req.pool, badge_number, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const create = (req, res) => {
    const inspector = req.body;
    inspectorDb.registerInspector(req.pool, inspector, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const deleteInspector = (req, res) => {
    const badge_number = req.params.badge_number;
    const role = req.params.role;
    inspectorDb.delete(req.pool, badge_number, role, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};