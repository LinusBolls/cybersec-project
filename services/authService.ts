import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/RefreshToken';
import Config from '../config';
import Env from '../env';
import { AppDataSource } from './dbService';

const getAccessToken = (userId: number) => {
    const accessToken = jwt.sign({ userId }, Env.accessTokenSecret, { expiresIn: Config.accessTokenExpiryMs });

    return accessToken;
}
const getRefreshToken = (userId: number) => {
    const refreshToken = jwt.sign({ userId }, Env.refreshTokenSecret, { expiresIn: Config.refreshTokenExpiryMs });

    return refreshToken;
}
const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10);

    return hash;
}

const loginUser = async (email: string, password: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const token = getAccessToken(user.id);

    return token;
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

    const token = getAccessToken(newUser.id);

    return token;
};
const refreshToken = async (oldToken: string) => {
    if (!oldToken) {
        throw new Error('No token provided');
    }

    let payload = null;
    try {
        payload = jwt.verify(oldToken, Env.refreshTokenSecret);
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
