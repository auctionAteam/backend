const pool = require("../db/mariadb");
const crypto = require("crypto");

const FindAllItem = async (limit, currentPage) => {
    const offset = limit * (currentPage - 1 );
    const values = [parseInt(limit), offset]

    const sql = `SELECT img, name, startTime, startPrice, priceUnit FROM auction LIMIT ? OFFSET ?`;

    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const FindFilterItem = async (state ,limit, currentPage) => {
    const offset = limit * (currentPage - 1 );
    const values = [state,parseInt(limit), offset]

    const sql = `SELECT img, name, startTime, startPrice, priceUnit FROM auction WHERE state = ? LIMIT ? OFFSET ?`;

    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const FindStateByItemId = async (itemId) => {
    const sql = `SELECT state FROM auction WHERE itemId = ?`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, itemId);
        return results[0].id;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const likeItem = async (itemId, userId) => {
    const sql = `INSERT INTO item (itemId, userId) VALUES (?, ?)`;
    const values = [itemId, userId];
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const addItem = async (userId, name, startTime,  startPrice, priceUnit, size, infomation) => {
    const sql = "INSERT INTO auction (userId, name, startTime,  startPrice, priceUnit, size, infomation) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [userId, name, startTime,  startPrice, priceUnit, size, infomation];
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const getItem = async (itemId) => {
    const sql = "SELECT * FROM auction WHERE id=?";
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, itemId);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { FindAllItem, addItem, FindFilterItem, getItem, likeItem}