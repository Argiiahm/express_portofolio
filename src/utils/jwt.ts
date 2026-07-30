import jwt from 'jsonwebtoken';

export interface AccessTokenPayload {
    id: string;
    email: string;
}

interface RefreshTokenPayload {
    id: string;
}

// create AccessToken
export function createAccessToken(payload: AccessTokenPayload) {
    return jwt.sign(payload, process.env.ACCESS_KEY!, {
        expiresIn: '15m',
    });
}
// create refreshToken
export function createRefreshToken(payload: RefreshTokenPayload) {
    return jwt.sign(payload, process.env.REFRESH_KEY!, {
        expiresIn: '7d',
    });
}
