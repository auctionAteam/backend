const pool = require("../db/mariadb");

const pagenation = async (currentPage, limit, totalCount) => {
  const totalPages = Math.ceil(totalCount / limit);
  return {
    currentPage: Number(currentPage),
    limit: Number(limit),
    totalCount: Number(totalCount),
    totalPages: Number(totalPages),
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

const countAllItem = async (name) => {
  let sql = "SELECT COUNT(*) as count FROM auction";

  if (name && name.trim() !== "") {
    sql += ` WHERE name LIKE '%${name.trim()}%'`;
  }

  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(sql);
    return results;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

const countFilterItem = async (state, name) => {
  let sql = "SELECT COUNT(*) as count FROM auction";
  const conditions = [];
  const values = [];

  if (state && state.trim() !== "") {
    conditions.push("state = ?");
    values.push(state);
  }

  if (name && name.trim() !== "") {
    conditions.push("name LIKE ?");
    values.push(`%${name.trim()}%`);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

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

const countSearchItem = async (name) => {
  const sql =
    `SELECT COUNT(*) as count FROM auction WHERE name LIKE '%` + name + `%'`;
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(sql);
    return results;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  pagenation,
  countFilterItem,
  countAllItem,
  countSearchItem,
};
