const { StatusCodes } = require("http-status-codes");
const itemService = require("../service/itemService");
const userService = require("../service/userService");
const utilPage = require("../util/pagenation");

const dotenv = require("dotenv");
dotenv.config();


const searchItem = async (req, res) => {
    const { name } = req.params;
    let searchItemRes = {};
    const { limit, currentPage } = req.query;

    try {
        let totalCount;

        const results = await itemService.searchItem(name, limit, currentPage);
        [totalCount] = await utilPage.countSearchItem(name);
        searchItemRes.items = results;
        
        const pagenation = await utilPage.pagenation(
        currentPage,
        limit,
        totalCount.count
        );
        searchItemRes.pagenation = pagenation;

        return res.status(StatusCodes.OK).json(searchItemRes);

    } catch (err) {
        console.log(err);
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
        });
    }
};


module.exports = { searchItem };
