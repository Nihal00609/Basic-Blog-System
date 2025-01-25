import mysql from "mysql2";
import "dotenv/config";

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_DATABASE } = process.env;

export const connectMysqlDb = () => {
    return mysql.createPool({
        port: DB_PORT || 8000,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        charset: "utf8mb4",
    });
};
