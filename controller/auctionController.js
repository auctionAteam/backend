const { StatusCodes } = require("http-status-codes");
const auctionService = require("../service/auctionService");
const itemService = require("../service/itemService");
const utilPage = require("../util/pagenation");



const startAuction = async (req, res) => {
    const { itemId } = req.params;

    try {
        const itemPrice = await itemService.findStartPriceByItemId(itemId);
        const changeState = await auctionService.changeState(itemId);
        const results = await auctionService.startAuction(itemId,itemPrice);
        const itemInfo = await auctionService.FindAuctioningItemInfoByItemId(itemId);

        return res.status(StatusCodes.CREATED).json({ message: "성공적으로 경매가 시작되었습니다." },itemInfo);
    } catch (err) {
        console.log(err);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
            });
    }
};

const bidAuction = async (req, res) => {
    const { itemId } = req.params;
    const { buyerId , price } = req.body;
    try {
        const results = await auctionService.buyItem(itemId,buyerId,price);
        const bidinfo = await auctionService.FindAuctioningItemBidInfoByItemId(itemId);

        return res.status(StatusCodes.OK).json({ 
            message: "성공적으로 입찰하였습니다.",
            info : bidinfo
        });

    } catch (err) {
        console.log(err);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
        });
    }
};

const closedAuction = async (req, res) => {
    const { itemId } = req.params;
    try {
        const historyValues = await auctionService.historyValues(itemId);
        const insertHistory = await auctionService.insertHistory(historyValues);

        const endValues = await auctionService.EndValues(itemId);
        const {endPrice,endTime} = endValues[0];

        const updateEndValues = await auctionService.updateEndValues(endPrice,endTime, itemId);
        const deleteAuctioningTable = await auctionService.deleteAuctioningTable(itemId);

        return res.status(StatusCodes.OK).json({ 
            message: "성공적으로 경매를 마쳤습니다.",
            info: historyValues
        });

    } catch (err) {
        console.log(err);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
        });
    }
};

module.exports = { startAuction, bidAuction, closedAuction };
