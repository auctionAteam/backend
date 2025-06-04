const pool = require("../db/mariadb");
const crypto = require("crypto");
const {executeQuery} = require("../util/executeQuery");


const joinUser = async ( email, password, name, phoneNum, address) => {
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    const sql = `INSERT INTO users (name, email, password, phoneNum, address, salt) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, email, hashPassword, phoneNum, address, salt];
    return await executeQuery(sql,values);
};

const findUserByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    return await executeQuery(sql,email);
};

const findUserIdByEmail = async (email) => {
    const sql = `SELECT id FROM users WHERE email = ?`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, email);
        if(!results.length){
            return 0;
        }
        return results[0].id;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const findUserItem = async (email) => {
    const useremail = await findUserIdByEmail(email);
    const sql = `SELECT * FROM item WHERE userId = ?`;
    const values = [useremail];
    return await executeQuery(sql,values);
};

module.exports = {joinUser, findUserByEmail, findUserItem, findUserIdByEmail}