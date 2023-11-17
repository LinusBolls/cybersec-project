import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { RefreshToken } from '../models/RefreshToken';
import Config from '../config';
import Env from '../env';
import { AppDataSource, initializeDb } from '../ormconfig';
import * as jose from "jose";

const getAccessToken = async (userId: string) => {
    const accessToken = await new jose.SignJWT({ sub: userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Date.now() + Config.accessTokenExpiryMs)
        .sign(new TextEncoder().encode(Env.accessTokenSecret));

    return accessToken;
}
const getRefreshToken = async (userId: string) => {
    const refreshToken = await new jose.SignJWT({ sub: userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Date.now() + Config.refreshTokenExpiryMs)
        .sign(new TextEncoder().encode(Env.refreshTokenSecret));

    return refreshToken
}
export const verifyAccessToken = async (token: string) => {
    const data = await jose.jwtVerify<{ sub: string, iat: number, exp: number }>(token, new TextEncoder().encode(Env.accessTokenSecret));

    return data;
}
export const verifyRefreshToken = async (token: string) => {
    const data = await jose.jwtVerify<{ sub: string, iat: number, exp: number }>(token, new TextEncoder().encode(Env.refreshTokenSecret));

    return data;
}
/**
 * hashes the password using a salt and appends the salt to the hash.
 */
const hashPassword = async (password: string) => {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
}
const comparePassword = async (password: string, hash: string) => {
    const isValid = await bcrypt.compare(password, hash);

    return isValid;
}

const loginUser = async (email: string, password: string) => {

    await initializeDb();
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });

    if (!user) {
        throw new Error('User not found');
    }
    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const refreshToken = await getRefreshToken(user.id);

    return { refreshToken };
};

export const getNewAccessToken = async (refreshTokenData: { sub: string, iat: number, exp: number }) => {

    await initializeDb();

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: refreshTokenData.sub });

    if (!user) {
        throw new Error('User not found');
    }
    const refreshToken = await getRefreshToken(user.id);

    return { refreshToken };
};

const registerUser = async (email: string, password: string, name: string) => {

    await initializeDb();
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    if (password.length < Config.minPasswordLength) {
        throw new Error('Password must be at least ' + Config.minPasswordLength + ' characters long');
    }

    const passwordHash = await hashPassword(password);
    const newUser = userRepository.create({ email, passwordHash, name, permissions: [] });
    await userRepository.save(newUser);

    const refreshToken = await getRefreshToken(newUser.id);

    return { refreshToken };
};
export { loginUser, registerUser };
