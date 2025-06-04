const pool = require("../db/mariadb");

async function executeQuery(sql, values) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { executeQuery };