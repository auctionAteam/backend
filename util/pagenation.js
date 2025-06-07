const pool = require("../db/mariadb");

const pagenation = async (currentPage, limit, totalCount) => {
    const totalPages = Math.ceil(totalCount / limit);
    return {
        currentPage: Number(currentPage),
        limit: Number(limit),
        totalCount: Number(totalCount),
        totalPages : Number(totalPages),
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    };
}

const countAllItem = async () => {
    const sql = "SELECT COUNT(*) as count FROM auction";
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

const countFilterItem = async (state) => {
    const sql = `SELECT COUNT(*) as count FROM auction WHERE state = ?`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql,state);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

const countSearchItem = async (name) => {
    const sql = `SELECT COUNT(*) as count FROM auction WHERE name LIKE '%`+name+`%'`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}



module.exports = {
    pagenation,
    countFilterItem,
    countAllItem,
    countSearchItem
};