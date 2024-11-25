import { check, validationResult } from "express-validator";


const getVehicleRules = () => [
    check("patent")
        .notEmpty().withMessage("Patent is required")
        .isLength({ max: 15 }).withMessage("Patent must not exceed 15 characters")
        .matches(/^[A-Z0-9-]+$/).withMessage("Patent must contain only uppercase letters, numbers, and hyphens"),
];

const registerVehicleRules = () => [
    check("patent")
        .notEmpty().withMessage("Patent is required")
        .isLength({ max: 15 }).withMessage("Patent must not exceed 15 characters")
        .matches(/^[A-Z0-9-]+$/).withMessage("Patent must contain only uppercase letters, numbers, and hyphens"),
    check("information")
        .notEmpty().withMessage("Information is required")
        .isLength({ max: 255 }).withMessage("Information must not exceed 255 characters")
        .trim(),
    check("user_id")
        .notEmpty().withMessage("User ID is required")
        .isInt({ min: 1 }).withMessage("User ID must be a positive integer"),
];

const updateVehicleRules = () => [
    check("patent")
        .notEmpty().withMessage("Patent is required")
        .isLength({ max: 15 }).withMessage("Patent must not exceed 15 characters")
        .matches(/^[A-Z0-9-]+$/).withMessage("Patent must contain only uppercase letters, numbers, and hyphens"),
    check("information")
        .optional()
        .isLength({ max: 255 }).withMessage("Information must not exceed 255 characters")
        .trim(),
    check("user_id")
        .optional()
        .isInt({ min: 1 }).withMessage("User ID must be a positive integer"),
];

const deleteVehicleRules = () => [
    check("patent")
        .notEmpty().withMessage("Patent is required")
        .isLength({ max: 15 }).withMessage("Patent must not exceed 15 characters")
        .matches(/^[A-Z0-9-]+$/).withMessage("Patent must contain only uppercase letters, numbers, and hyphens"),
];


const v = {
    getVehicleRules,
    registerVehicleRules,
    updateVehicleRules,
    deleteVehicleRules,
};


export default v;