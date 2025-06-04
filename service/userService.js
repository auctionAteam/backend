const pool = require("../db/mariadb");
const crypto = require("crypto");

const joinUser = async ( email, password, name, phoneNum, address) => {
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    const sql = `INSERT INTO users (name, email, password, phoneNum, address, salt) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, email, hashPassword, phoneNum, address, salt];
    console.log(values);
    
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

const findUserByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, email);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const findUserIdByEmail = async (email) => {
    const sql = `SELECT id FROM users WHERE email = ?`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, email);
        return results[0].id;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const findUserItem = async (email, state) => {
    const useremail = findUserByEmail(email);
    const sql = `SELECT * FROM item WHERE userId = ? AND state= ?`;
    const values = [useremail.id,state];
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

module.exports = {joinUser, findUserByEmail, findUserItem, findUserIdByEmail}