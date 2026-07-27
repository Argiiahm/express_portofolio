import { z } from 'zod';

export const AuthSchmeaRegister = z.object({
    username: z
        .string()
        .min(6, 'username minimum 6 character')
        .max(10, 'username maxium 10 character'),
    email: z.string().email('Invalid format email'),
    password: z.string().min(8, 'password minimum 8 character'),
});

export const AuthSchmeaLogin = z.object({
    email: z.string().email('Invalid format email'),
    password: z.string().min(8, 'password minimum 8 character'),
});

export type AuthInputRegister = z.infer<typeof AuthSchmeaRegister>;
export type AuthInputLogin = z.infer<typeof AuthSchmeaLogin>;
