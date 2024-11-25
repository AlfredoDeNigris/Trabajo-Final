import { check } from "express-validator";


const getInspectorRules = () => [
    check("badge_number")
        .notEmpty().withMessage("Badge number is required")
        .isNumeric().withMessage("Badge number must be a number"),
];

const createInspectorRules = () => [
    check("full_name")
        .notEmpty().withMessage("Full name is required")
        .isString().withMessage("Full name must be a string")
        .matches(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑçÇ\s]+$/).withMessage("Full name contains invalid characters."),
    check("license")
        .notEmpty().withMessage("License is required"),
    check("date_birth")
        .notEmpty().withMessage("Date of birth is required"),
    check("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    check("billing_address")
        .notEmpty().withMessage("Billing address is required"),
    check("phone_number")
        .notEmpty().withMessage("Phone number is required")
        .isNumeric().withMessage("Phone number must be a number"),
    check("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address"),
];

const deleteInspectorRules = () => [
    check("badge_number")
        .notEmpty().withMessage("Badge number is required")
        .isNumeric().withMessage("Badge number must be a number."),
    check("role")
        .notEmpty().withMessage("A valid role is required."),
];


const v = {
    getInspectorRules,
    createInspectorRules,
    deleteInspectorRules,
};


export default v;