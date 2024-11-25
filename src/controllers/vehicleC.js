import vehicleDb from '../models/vehicleM.js';

export const getV = (req, res) => {
    vehicleDb.getV(req.pool, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};


export const getVP = (req, res) => {
    const patent = req.params.patent;
    vehicleDb.getVP(req.pool, patent, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const registervehicle = (req, res) => {
    const vehicle = req.body;
    vehicleDb.create(req.pool, vehicle, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const updateVehicle = (req, res) => {
    const patent = req.params.patent;
    const vehicle = req.body;
    vehicleDb.updateVehicle(req.pool, patent, vehicle, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

export const deleteVehicle = (req, res) => {
    const patent = req.params.patent;
    vehicleDb.delete(req.pool, patent, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};