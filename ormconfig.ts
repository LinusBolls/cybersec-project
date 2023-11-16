import { Box } from "./models/Box";
import { BoxCode } from "./models/BoxCode";
import { RefreshToken } from "./models/RefreshToken";
import { User } from "./models/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    synchronize: true,
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "admin",
    database: "cyberauth",
    entities: [
        User,
        RefreshToken,
        Box,
        BoxCode,
    ],
    // entities: [__dirname + '/../models/*.ts'],
});

export const initializeDb = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
            .catch((err) => {
                console.error("[fatal] error during data source initialization", err);
            });
    }
    return AppDataSource;
};