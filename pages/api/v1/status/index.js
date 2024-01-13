import database from "infra/database";

const status = async (request, response) => {
    const updatedAt = new Date().toISOString();

    const {
        rows: {
            0: { server_version },
        },
    } = await database.query("show server_version");

    const {
        rows: {
            0: { max_connections },
        },
    } = await database.query("show max_connections");

    const databaseName = process.env.POSTGRES_DATABASE;
    const {
        rows: {
            0: { active_connections },
        },
    } = await database.query({
        text: "SELECT count(*)::int as active_connections FROM pg_stat_activity where datname = $1;",
        values: [databaseName],
    });

    response.status(200).json({
        updated_at: updatedAt,
        dependencies: {
            database: {
                version: server_version,
                max_connections: Number(max_connections),
                opened_connections: active_connections,
            },
        },
    });
};

export default status;
