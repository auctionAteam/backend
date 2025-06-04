const pool = require("../db/mariadb");
const crypto = require("crypto");
const {executeQuery} = require("../util/executeQuery");

const findAllItem = async (limit, currentPage) => {
    const offset = limit * (currentPage - 1 );
    const values = [parseInt(limit), offset]

    const sql = `SELECT img, name, startTime, startPrice, priceUnit FROM auction LIMIT ? OFFSET ?`;
    return await executeQuery(sql,values);
};

const findFilterItem = async (state ,limit, currentPage) => {
    const offset = limit * (currentPage - 1 );
    const values = [state,parseInt(limit), offset]

    const sql = `SELECT img, name, startTime, startPrice, priceUnit FROM auction WHERE state = ? LIMIT ? OFFSET ?`;
    return await executeQuery(sql,values);
};

const findStateByItemId = async (itemId) => {
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

const findItemInfoByItemId = async (itemId, limit, currentPage) => {
    const offset = limit * (currentPage - 1 );
    const values = [itemId,parseInt(limit), offset]

    const sql = `SELECT img, name, startTime, startPrice, priceUnit,state FROM auction WHERE id = ? LIMIT ? OFFSET ?`;
    
    return await executeQuery(sql,values);
};

const findFilterItemInfoByItemId = async (itemId, state ,limit, currentPage) => {
    const offset = limit * (currentPage - 1 );
    const values = [itemId, state ,parseInt(limit), offset]

    const sql = `SELECT img, name, startTime, startPrice, priceUnit,state FROM auction WHERE id = ? AND state = ? LIMIT ? OFFSET ?`;

    return await executeQuery(sql,values);
};

const likeItem = async (itemId, userId) => {
    const sql = `INSERT INTO item (itemId, userId) VALUES (?, ?)`;
    const values = [itemId, userId];

    return await executeQuery(sql,values);
};

const addItem = async (userId, name, startTime,  startPrice, priceUnit, size, infomation) => {
    const sql = "INSERT INTO auction (userId, name, startTime,  startPrice, priceUnit, size, infomation) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [userId, name, startTime,  startPrice, priceUnit, size, infomation];

    return await executeQuery(sql,values);
};

const getItem = async (itemId) => {
    const sql = "SELECT * FROM auction WHERE id=?";
    return await executeQuery(sql,itemId);
}

module.exports = { 
    findAllItem, 
    addItem, 
    findFilterItem, 
    getItem, 
    likeItem,
    findStateByItemId,
    findItemInfoByItemId,
    findFilterItemInfoByItemId
};