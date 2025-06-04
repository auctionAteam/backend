const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const userService = require("../service/userService");
const itemService = require("../service/itemService");
const utilPage = require("../util/pagenation");

const join = async (req, res) => {
    const {email, password, name, phoneNum, address } = req.body;
    try {
        const loginUser = await userService.findUserByEmail(email);
        if(loginUser.length) {
            return res.status(StatusCodes.CONFLICT).json({ message : "이미 존재하는 이메일입니다." });
        }

        await userService.joinUser(email, password, name, phoneNum, address);
        return res.status(StatusCodes.CREATED).json({ message : "성공적으로 회원가입 되었습니다. "});
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const loginUser = await userService.findUserByEmail(email);
        
        if (!loginUser[0]) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message : "없는 아이디입니다." });
        }
        
        const hashPassword = crypto.pbkdf2Sync(password, loginUser[0].salt, 10000, 10, 'sha512').toString('base64');
        if (loginUser[0].password !== hashPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "아이디 또는 비밀번호를 다시 확인해주세요." });
        }

        const token = jwt.sign(
            { 
                id: loginUser[0].id, 
                email: loginUser[0].email 
            }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXPIRES_IN  
            } 
        );

        return res.status(StatusCodes.OK).json({
            loginUser : loginUser[0],
            token : token
        });

    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

const infomation = async (req, res) => {
    const { email } = req.body;
    try {
        const userInfo = await userService.findUserByEmail(email);
        if (userInfo.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message : "해당 데이터가 없습니다."});
        } else {
            return  res.status(StatusCodes.OK).json(userInfo);
        }
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

const userItem = async (req, res) => {
    let allUserItemRes = {};

    const {email,limit,currentPage} = req.body;
    const state = req.body.state || 0;

    try {
        const userItems = await userService.findUserItem(email);
        const itemIds = userItems.map(item => item.itemId);

        if (!itemIds.length) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "관심 물건이 없습니다." });
        }

        let items = [];

        if (state) {
            items = await Promise.all(
                itemIds.map(itemId =>
                    itemService.findFilterItemInfoByItemId(itemId, state, limit, currentPage)
                )
            );
        } else {
            items = await Promise.all(
                itemIds.map(itemId =>
                    itemService.findItemInfoByItemId(itemId, limit, currentPage)
                )
            );
        }

        allUserItemRes.items = items.flat();

        if (!allUserItemRes.items.length) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: state ? "필터링된 관심 물건이 없습니다." : "모든 관심 물건이 없습니다." });
        }

        const pagenation = await utilPage.pagenation(currentPage, limit, itemIds.length);
        allUserItemRes.pagenation = pagenation;

        return res.status(StatusCodes.OK).json(allUserItemRes);
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
    
}


module.exports = { join, login , infomation, userItem };