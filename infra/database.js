import { Client } from "pg";

const query = async (queryObject) => {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl: getSSLValues(),
    });

    try {
        await client.connect();
        const result = await client.query(queryObject);
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
};

export default {
    query,
};

const getSSLValues = () => {
    if (process.env.POSTGRES_CA) {
        return {
            ca: process.env.POSTGRES_CA,
        };
    }
    return process.env.NODE_ENV == "production" ? true : false;
};
