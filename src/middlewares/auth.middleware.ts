import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AccessTokenPayload } from '../utils/jwt.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Unauhorized',
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not found',
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_KEY!) as AccessTokenPayload;
        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};
