import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAccessToken, createRefreshToken } from '../utils/jwt.js';

// Register
export const Register = async (username: string, email: string, password: string) => {
    const [existUsername, existEmail] = await Promise.all([
        prisma.user.findUnique({ where: { username } }),
        prisma.user.findUnique({ where: { email } }),
    ]);

    // cek username sudah digunakan
    if (existUsername) {
        throw new Error('username already taken');
    }

    // cek email sudah terdaftar
    if (existEmail) {
        throw new Error('email already registered');
    }

    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashPassword,
        },
    });

    return user;
};

// Login
export const Login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    // Cek Apakah kredensial ini
    // terdaftar dalam sistem?
    if (!user) {
        throw new Error('Invalid Credentials');
    }

    // cek password apakah
    // sudahh sesuai dengan yang terdafatr
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid Credentials');
    }

    // create AccessToken
    const accessToken = createAccessToken({
        id: user.id,
        email: user.email,
    });

    // create RefreshToken
    const refreshToken = createRefreshToken({
        id: user.id,
    });

    await prisma.user.update({
        where: { id: user.id },
        data: {
            refreshToken: refreshToken,
        },
    });

    return {
        accessToken,
        refreshToken,
    };
};

// Refresh
export const Refresh = async (refreshToken: string) => {
    if (!refreshToken) {
        throw new Error('Refresh token missing');
    }

    const user = await prisma.user.findFirst({
        where: { refreshToken },
    });

    if (!user) {
        throw new Error('Invalid refreshToken');
    }

    jwt.verify(refreshToken, process.env.REFRESH_KEY!, (err) => {
        if (err) {
            throw new Error('refreshToken expires');
        }
    });

    const AccessToken = createAccessToken({
        id: user.id,
        email: user.email,
    });

    return AccessToken;
};

// Logout
export const Logout = async (refreshToken: string) => {
    const user = await prisma.user.findFirst({
        where: { refreshToken },
    });

    if (!user) {
        throw new Error('Invalid refreshToken');
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            refreshToken: null,
        },
    });
};
