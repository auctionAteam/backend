const { StatusCodes } = require("http-status-codes");
const itemService = require("../service/itemService");
const userService = require("../service/userService");
const utilPage = require("../util/pagenation");

const dotenv = require("dotenv");
dotenv.config();

const allItem = async (req, res) => {
  let allItemRes = {};

  const { limit, currentPage, name, state } = req.query;

  try {
    let totalCount;

    if (state) {
      results = await itemService.findFilterItem(
        name,
        state,
        limit,
        currentPage
      );
      [totalCount] = await utilPage.countFilterItem(state, name);
      allItemRes.items = results;
    } else {
      results = await itemService.findAllItem(name, limit, currentPage);
      [totalCount] = await utilPage.countAllItem(name);
      allItemRes.items = results;
    }

    const pagenation = await utilPage.pagenation(
      currentPage,
      limit,
      totalCount.count
    );
    allItemRes.pagenation = pagenation;

    return res.status(StatusCodes.OK).json(allItemRes);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
};

const addItem = async (req, res) => {
  const { email, name, day, startPrice, priceUnit, size, infomation } =
    req.body;

  let auctionStartTime = new Date();
  auctionStartTime.setDate(auctionStartTime.getDay() + parseInt(day));
  // auctionStartTime.setHours(auctionStartTime.getHours() + 9);
  // 데이터베이스는 표준 시간이 한국으로 되어있어서 할 필요가 없다.
  // 만약 프론트에서는 영국시간으로 되어있으면 활성화시키기

  try {
    const userId = await userService.findUserIdByEmail(email);
    const results = await itemService.addItem(
      userId,
      name,
      auctionStartTime,
      startPrice,
      priceUnit,
      size,
      infomation
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "성공적으로 물건이 등록되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
};

const detailItem = async (req, res) => {
  const { itemId } = req.params;
  console.log("2");
  try {
    const results = await itemService.getItem(itemId);
    return res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
};

const likeItem = async (req, res) => {
  const { itemId } = req.params;
  const { email } = req.user;

  try {
    const userId = await userService.findUserIdByEmail(email);
    const results = await itemService.likeItem(itemId, userId);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "성공적으로 관심 물건이 등록되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
};

const deleteLikeItem = async (req, res) => {
  const { itemId } = req.params;
  const { email } = req.user;
  try {
    const userId = await userService.findUserIdByEmail(email);
    const results = await itemService.deleteLikeItem(itemId, userId);
    return res
      .status(StatusCodes.OK)
      .json({ message: "성공적으로 관심 물건이 삭제되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
};

module.exports = { allItem, addItem, detailItem, likeItem, deleteLikeItem };
