import { check } from "express-validator";

const getFineByIdRules = () => [
    check("fine_id")
        .notEmpty().withMessage("Fine ID is required")
        .isNumeric().withMessage("Fine ID must be a number"),
];

const issueFineRules = () => [
    check("fine_description")
        .notEmpty().withMessage("Fine description is required")
        .isString().withMessage("Fine description must be a string")
        .isLength({ max: 255 }).withMessage("Fine description cannot exceed 255 characters"),
    check("patent")
        .notEmpty().withMessage("Patent is required")
        .isString().withMessage("Patent must be a string")
        .isLength({ max: 15 }).withMessage("Patent cannot exceed 15 characters"),
    check("badge_number")
        .notEmpty().withMessage("Badge number is required")
        .isInt().withMessage("Badge number must be an integer"),
    check("reason_id")
        .notEmpty().withMessage("Reason ID is required")
        .isInt().withMessage("Reason ID must be an integer"),
];

const payFineRules = () => [
    check("fine_id")
        .notEmpty().withMessage("Fine ID is required")
        .isNumeric().withMessage("Fine ID must be a number"),
];


const v = {
    getFineByIdRules,
    issueFineRules,
    payFineRules,
};


export default v;