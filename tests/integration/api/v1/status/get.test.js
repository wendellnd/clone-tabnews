test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

    console.log(responseBody.database);
    expect(responseBody.database).toBeDefined();

    expect(responseBody.database.postgres_version).toBe("16.0");
    expect(responseBody.database.max_connections).toBe(100);
    expect(typeof responseBody.database.active_connections).toBe("number");
});
