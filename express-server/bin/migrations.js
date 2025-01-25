import path from "path";
import mysqlMigrations from "mysql-migrations";
//
import { connectMysqlDb } from "../database/index.js";

const connection = connectMysqlDb();
const __dirname = path.resolve();

mysqlMigrations.init(connection, __dirname + "/migrations");
