import jwt from 'jsonwebtoken';

interface createAccessTokenPayload {
    id: string;
    email: string;
}

interface createRefreshTokenPayload {
    id: string;
}

// create AccessToken
export function createAccessToken(payload: createAccessTokenPayload) {
    return jwt.sign(payload, process.env.ACCESS_KEY!, {
        expiresIn: '15m',
    });
}
// create refreshToken
export function createRefreshToken(payload: createRefreshTokenPayload) {
    return jwt.sign(payload, process.env.REFRESH_KEY!, {
        expiresIn: '7d',
    });
}
