import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/RefreshToken';
import Config from '../config';
import Env from '../env';
import { AppDataSource } from '../ormconfig';

const getAccessToken = (userId: number) => {
    const accessToken = jwt.sign({ sub: userId }, Env.accessTokenSecret, { expiresIn: Config.accessTokenExpiryMs });

    return accessToken;
}
const getRefreshToken = (userId: number) => {
    const refreshToken = jwt.sign({ sub: userId }, Env.refreshTokenSecret, { expiresIn: Config.refreshTokenExpiryMs });

    return refreshToken;
}
export const verifyAccessToken = (token: string) => {
    const data = jwt.verify(token, Env.accessTokenSecret) as { sub: string, iat: number, exp: number };

    return data;
}
export const verifyRefreshToken = (token: string) => {
    const data = jwt.verify(token, Env.refreshTokenSecret) as { sub: string, iat: number, exp: number };

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
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }
    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const accessToken = getAccessToken(user.id);

    return { accessToken, refreshToken: "" };
};

const registerUser = async (email: string, password: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const passwordHash = await hashPassword(password);
    const newUser = userRepository.create({ email, passwordHash });
    await userRepository.save(newUser);

    const accessToken = getAccessToken(newUser.id);

    return { accessToken, refreshToken: "" };
};
const refreshToken = async (oldToken: string) => {
    if (!oldToken) {
        throw new Error('No token provided');
    }

    let payload: ReturnType<typeof verifyRefreshToken> | null = null;
    try {
        payload = verifyRefreshToken(oldToken);
    } catch (e) {
        throw new Error('Invalid token');
    }

    const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

    const storedToken = await refreshTokenRepository.findOne({ token: oldToken });

    if (!storedToken || storedToken.expiryDate.getTime() < new Date().getTime()) {
        throw new Error('Invalid or expired token');
    }

    const user = storedToken.user;
    const newAccessToken = getAccessToken(user.id);

    // Optionally create a new refresh token
    const newRefreshToken = getRefreshToken(user.id);

    // Save new refresh token in the database and delete the old one
    await refreshTokenRepository.delete({ token: oldToken });

    const newStoredToken = refreshTokenRepository.create({
        user: user,
        token: newRefreshToken,
        expiryDate: new Date(new Date().getTime() + Config.refreshTokenExpiryMs),
    });

    await refreshTokenRepository.save(newStoredToken);

    return { newAccessToken, newRefreshToken };
};

export { loginUser, registerUser, refreshToken };
