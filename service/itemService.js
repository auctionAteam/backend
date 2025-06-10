const pool = require("../db/mariadb");
const { executeQuery } = require("../util/executeQuery");

const findAllItem = async (name, limit, currentPage) => {
  const offset = limit * (currentPage - 1);
  const values = [];

  let sql = `SELECT 
                auc.id, users.name as userName, auc.img, auc.name as itemName, 
                auc.startTime, auc.endTime, auc.startPrice, auc.priceUnit 
                FROM auction AS auc 
                INNER JOIN users ON auc.userId = users.id`;

  if (name && name.trim() !== "") {
    sql += " WHERE auc.name LIKE ?";
    values.push(`%${name.trim()}%`);
  }

  sql += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);

  return await executeQuery(sql, values);
};

const findFilterItem = async (name, state, limit, currentPage) => {
  const offset = limit * (currentPage - 1);
  let sql = `SELECT 
    auc.id, users.name as userName, auc.img, auc.name, auc.startTime, auc.endTime, auc.startPrice, auc.priceUnit 
    FROM auction AS auc 
    INNER JOIN users ON auc.userId = users.id`;

  const values = [];
  const conditions = [];

  if (state && state.trim() !== "") {
    conditions.push("auc.state = ?");
    values.push(state);
  }

  if (name && name.trim() !== "") {
    conditions.push("auc.name LIKE ?");
    values.push(`%${name.trim()}%`);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);

  return await executeQuery(sql, values);
};

const searchItem = async (name, limit, currentPage) => {
  const offset = limit * (currentPage - 1);
  const values = [parseInt(limit), offset];

  const sql =
    `SELECT img, name, startTime, startPrice, priceUnit,state FROM auction WHERE name LIKE "%` +
    name +
    `%" LIMIT ? OFFSET ?`;

  return await executeQuery(sql, values);
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
  const offset = limit * (currentPage - 1);
  const values = [itemId, parseInt(limit), offset];

  const sql = `SELECT img, name, startTime, startPrice, priceUnit,state FROM auction WHERE id = ? LIMIT ? OFFSET ?`;

  return await executeQuery(sql, values);
};

const findFilterItemInfoByItemId = async (
  itemId,
  state,
  limit,
  currentPage
) => {
  const offset = limit * (currentPage - 1);
  const values = [itemId, state, parseInt(limit), offset];

  const sql = `SELECT img, name, startTime, startPrice, priceUnit,state FROM auction WHERE id = ? AND state = ? LIMIT ? OFFSET ?`;

  return await executeQuery(sql, values);
};

const likeItem = async (itemId, userId) => {
  const sql = `INSERT INTO item (itemId, userId) VALUES (?, ?)`;
  const values = [itemId, userId];

  return await executeQuery(sql, values);
};

const deleteLikeItem = async (itemId, userId) => {
  const sql = `DELETE FROM item WHERE itemId = ? AND userId = ?;`;
  const values = [itemId, userId];

  return await executeQuery(sql, values);
};

const addItem = async (
  userId,
  name,
  auctionStartTime,
  startPrice,
  priceUnit,
  size,
  infomation
) => {
  const sql =
    "INSERT INTO auction (userId, name, startTime, startPrice, priceUnit, size, infomation) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    userId,
    name,
    auctionStartTime,
    startPrice,
    priceUnit,
    size,
    infomation,
  ];

  return await executeQuery(sql, values);
};

const getItem = async (itemId) => {
  const sql = "SELECT * FROM auction WHERE id=?";
  return await executeQuery(sql, itemId);
};

const findStartPriceByItemId = async (itemId) => {
  const sql = "SELECT startPrice FROM auction WHERE id=?";
  return await executeQuery(sql, itemId);
};

const findStartTimeByItemId = async (itemId) => {
  const sql = "SELECT starttime FROM auction WHERE id=?";
  return await executeQuery(sql, itemId);
};

module.exports = {
  findAllItem,
  findFilterItem,

  addItem,
  getItem,
  likeItem,
  deleteLikeItem,

  findStateByItemId,
  findItemInfoByItemId,
  findFilterItemInfoByItemId,
  findStartPriceByItemId,
  findStartTimeByItemId,

  searchItem,
};
