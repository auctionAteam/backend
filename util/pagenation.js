const pool = require("../db/mariadb");

const pagenation = async (currentPage) => {
    const sql = "SELECT found_rows()";
    let pagenation = {}
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql);
        pagenation.currentPage = currentPage;
        pagenation.totalCount = results[0]["found_rows()"];
        
        return pagenation;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    pagenation
};