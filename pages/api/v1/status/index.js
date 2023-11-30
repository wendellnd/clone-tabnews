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

    const {
        rows: {
            0: { active_connections },
        },
    } = await database.query(
        "SELECT count(*) as active_connections FROM pg_stat_activity where state = 'active'"
    );

    response.status(200).json({
        updated_at: updatedAt,
        database: {
            postgres_version: server_version,
            max_connections: Number(max_connections),
            active_connections: Number(active_connections),
        },
    });
};

export default status;
