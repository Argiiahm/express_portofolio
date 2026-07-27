import * as AuthService from '../services/auth.service.js';
import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
    AuthSchmeaLogin,
    AuthSchmeaRegister,
    type AuthInputRegister,
    type AuthInputLogin,
} from '../validations/auth.schema.js';

// Register
export const Register = asyncHandler(
    async (req: Request<object, object, AuthInputRegister>, res: Response) => {
        const { username, email, password } = req.body;
        // validate with zod
        const validateData = AuthSchmeaRegister.safeParse({
            username,
            email,
            password,
        });

        if (!validateData.success) {
            return res.status(400).json({
                success: false,
                errors: validateData.error.flatten(),
            });
        }

        // create account
        const user = await AuthService.Register(
            validateData.data.username,
            validateData.data.email,
            validateData.data.password
        );

        return res.status(201).json({
            success: true,
            message: 'User successfully created.',
            data: user,
        });
    }
);

// Login
export const Login = asyncHandler(
    async (req: Request<object, object, AuthInputLogin>, res: Response) => {
        const { email, password } = req.body;
        // validate with zod
        const validateData = AuthSchmeaLogin.safeParse({
            email,
            password,
        });

        if (!validateData.success) {
            return res.status(400).json({
                success: false,
                errors: validateData.error.flatten(),
            });
        }

        const { accessToken, refreshToken } = await AuthService.Login(
            validateData.data.email,
            validateData.data.password
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json({
            success: true,
            message: 'Login success',
            token: accessToken,
        });
    }
);

// Refresh
export const Refresh = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const token = await AuthService.Refresh(refreshToken);
    return res.status(200).json({
        sucess: true,
        token: token,
    });
});

// Logout
export const Logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: 'Refresh token missing',
        });
    }

    await AuthService.Logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout success',
    });
});
