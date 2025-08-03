"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: err.errors,
        });
    }
};
exports.validateRequest = validateRequest;
