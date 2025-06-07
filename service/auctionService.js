const pool = require("../db/mariadb");
const crypto = require("crypto");
const {executeQuery} = require("../util/executeQuery");

const startAuction = async (itemId) => {
    const priceSql = `SELECT startPrice AS price FROM auction WHERE id = ?;`
    const price = await executeQuery(priceSql,itemId);

    const sql = `INSERT INTO auctioning (itemId, price) VALUES (?, ?);`;
    const values = [itemId,price[0].price];

    return await executeQuery(sql,values);
};

const changeState = async (itemId) => {
    const sql = `UPDATE auction SET state="auction" WHERE id = ?;`;
    const values = [itemId];

    return await executeQuery(sql,values);
};

const buyItem = async (itemId,buyerId,price) => {
    const sql = `UPDATE auctioning SET buyerId = ?, price = ? WHERE itemid = ?;`;
    const values = [buyerId,price,itemId];

    return await executeQuery(sql,values);
};



const deleteAuctioningTable = async (itemId) => {
    const sql = `DELETE FROM auctioning WHERE itemId = ?`;
    const values = [itemId];

    return await executeQuery(sql,values);
};

const updateEndValues = async (endPrice, endTime, itemId) => {
    const sql = `UPDATE auction SET endPrice =? , endTime =? WHERE id = ?;`;
    const values = [endPrice, endTime, itemId];

    return await executeQuery(sql,values);
};

const insertHistory = async (historyValues) => {
    const { buyerId, itemId, sellerId } = historyValues[0];

    const sql = `INSERT INTO auctionHistory (buyerId, itemId, sellerId) VALUES (?,?,?);`;
    const values = [buyerId, itemId, sellerId];

    return await executeQuery(sql,values);
};



const FindAuctioningItemAllInfoByItemId = async (itemId) => {
    const sql = `SELECT * FROM auctioning WHERE itemId = ?`;
    const values = [itemId];

    return await executeQuery(sql,values);
};

const FindAuctioningItemInfoByItemId = async (itemId) => {
    const sql = `SELECT id,price FROM auctioning WHERE itemId = ?`;
    const values = [itemId];

    return await executeQuery(sql,values);
};

const FindAuctioningItemBidInfoByItemId = async (itemId) => {
    const sql = `SELECT buyerId,price FROM auctioning WHERE itemId = ?`;
    const values = [itemId];

    return await executeQuery(sql,values);
};


const historyValues = async (itemId) => {
    const sql = `SELECT 
                    auctioning.itemId, auctioning.buyerId, auction.userId AS sellerId, auctioning.price  
                    FROM auctioning 
                    INNER JOIN auction ON auctioning.itemId = auction.id 
                    WHERE auctioning.itemId = ?
                ;`;
    const values = [itemId];

    return await executeQuery(sql,values);
};

const EndValues = async (itemId) => {
    const sql = `SELECT 
                    history.auctionDate AS endTime, auctioning.price AS endPrice
                    FROM auctioning 
                    INNER JOIN auctionHistory AS history 
                    ON auctioning.itemId = history.itemId 
                    WHERE auctioning.itemId = ?
                ;`;
    const values = [itemId];

    return await executeQuery(sql,values);
};



module.exports = { 
    startAuction,
    changeState,
    buyItem,

    FindAuctioningItemAllInfoByItemId,
    FindAuctioningItemInfoByItemId,
    FindAuctioningItemBidInfoByItemId,

    deleteAuctioningTable,
    updateEndValues,
    insertHistory,
    
    historyValues,
    EndValues
};