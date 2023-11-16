import { Box } from "@/models/Box";
import { RefreshToken } from "../models/RefreshToken";
import { User } from "../models/User";
import { DataSource } from "typeorm"
import { BoxCode } from "@/models/BoxCode";

export const AppDataSource = new DataSource({
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
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export const getDataSource = () => AppDataSource.initialize()
    .then((source) => {
        console.log("Data Source has been initialized!")

        return source;
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })