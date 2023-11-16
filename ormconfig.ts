import Env from "./env";
import { Box } from "./models/Box";
import { BoxCode } from "./models/BoxCode";
import { RefreshToken } from "./models/RefreshToken";
import { User } from "./models/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    synchronize: true,
    type: "postgres",
    host: Env.db.host,
    port: Env.db.port,
    username: Env.db.username,
    password: Env.db.password,
    database: Env.db.database,
    entities: [
        User,
        RefreshToken,
        Box,
        BoxCode,
    ],
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