const { StatusCodes } = require("http-status-codes");
const itemService = require("../service/itemService");
const userService = require("../service/userService");
const utilPage = require("../util/pagenation");
const { eunmState } = require("../model/enum");

const dotenv = require("dotenv");
dotenv.config();

const allItem = async (req, res) => {
    let allItemRes = {};
    const {limit, currentPage} = req.body;
    const state = req.body.state || 0;
    let filterresults = {};
    let itemresults = {};
    try {
        if(state){
            filterresults = await itemService.FindFilterItem(state,limit, currentPage);
            if(!filterresults.length) {
                return res.status(StatusCodes.NOT_FOUND).json({ message : "필터링된 물건이 없습니다." });
            }
            allItemRes.items = filterresults;
        }
        else {
            itemresults = await itemService.FindAllItem(limit, currentPage);
            if(!itemresults.length) {
                return res.status(StatusCodes.NOT_FOUND).json({ message : "모든 물건이 없습니다." });
            }
            allItemRes.items = itemresults;
        }

        const pagenation = await utilPage.pagenation(currentPage);
        allItemRes.pagenation = pagenation;

        return res.status(StatusCodes.OK).json(allItemRes);
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

const addItem = async (req, res) => {
    const {email, name, startTime, day, startPrice, priceUnit, size, infomation } = req.body;
    try {
        const userId = await userService.findUserIdByEmail(email);
        const results = await itemService.addItem(userId, name, startTime,  startPrice, priceUnit, size, infomation);
        return res.status(StatusCodes.CREATED).json({ message : "성공적으로 물건이 등록되었습니다."});
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

const detailItem = async (req, res) => {
    const {itemId} = req.params;
    try {
        const results = await itemService.getItem(itemId);
        return res.status(StatusCodes.CREATED).json(results);
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

const likeItem = async (req, res) => {
    const {itemId} = req.params;
    const {email} = req.body;
    try {
        const userId = await userService.findUserIdByEmail(email);
        const results = await itemService.likeItem(itemId,userId);
        return res.status(StatusCodes.CREATED).json({ message : "성공적으로 관심 물건이 등록되었습니다."});
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

module.exports = { allItem, addItem, detailItem, likeItem};