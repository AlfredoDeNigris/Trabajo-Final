import { check, validationResult } from "express-validator";

const getUserRules = () => [
    check("user_id")
        .notEmpty().withMessage("User ID is required")
        .isNumeric().withMessage("User ID must be a number"),
];

const registerUserRules = () => [
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

const updateUserRules = () => [
    check("user_id")
        .notEmpty().withMessage("User ID is required")
        .isNumeric().withMessage("User ID must be a number"),
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

const deleteUserRules = () => [
    check("user_id")
        .notEmpty().withMessage("User ID is required")
        .isNumeric().withMessage("User ID must be a number"),
];


const v = {
    getUserRules,
    registerUserRules,
    updateUserRules,
    deleteUserRules,
};


export default v;