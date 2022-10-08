import dotenv from "dotenv";
import * as process from "process";

/**
 * Environment Configuration
 *
 * @author Yepeng Ding
 */
dotenv.config();


export const env = {
    node: {
        env: process.env.NODE_ENV || 'development'
    },
    debug: process.env.NODE_ENV === 'development',
    app: {
        domain: process.env.APP_DOMAIN || 'http://localhost',
        port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 9000,
        endpoint: `${process.env.APP_DOMAIN || 'http://localhost'}:${process.env.APP_PORT || 9000}`
    },
    log: {
        dir: process.env.LOG_DIR || 'log',
        format: process.env.LOG_FORMAT || 'common'
    },
    db: {
        type: process.env.DB_TYPE ? process.env.DB_TYPE : 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_DATABASE || 'db',
        synchronize: process.env.DB_SYNCHRONIZE === "true",
        logging: process.env.DB_LOGGING === "true",
        logger: process.env.DB_LOGGER ? process.env.DB_LOGGER : "advanced-console",
    },
    vdr: {
        endpoint: process.env.VDR_ENDPOINT || "http://localhost:8000"
    }
}

