const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

const userProvider = require("./userProvider");
const userDao = require("./userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");


exports.createUser = async function (userId, password, userName) {
    try {

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertUserInfoParams = [userId, userName, hashedPassword];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`);

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userIdResult[0].insertId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        connection.release();
        return userIdResult[0].insertId;

    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createUserSize = async function (userIdx, gender, height, weight, proportion, muscle) {
    try {
        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertUserInfoParams = [userIdx, gender, height, weight, proportion, muscle];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserSizeInfo(connection, insertUserInfoParams);
        console.log(`추가된 idx : ${userIdResult[0].insertId}`);

        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createUserSize Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.insertUsermodel = async function (model, userIdx) {
    try {
        const params = [model, userIdx]
        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUsermodel(connection, params);

        connection.release();
        return response(baseResponse.SUCCESS, {userIdx: userIdx, modelUrl: model});

    } catch (err) {
        logger.error(`App - insertUsermodel Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.postSignIn = async function (userId, password) {
    try {
        // 이메일 여부 확인
        const userIdRows = await userProvider.userCheck(userId);
        if (userIdRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);


        // 비밀번호 확인 (입력한 비밀번호를 암호화한 것과 DB에 저장된 비밀번호가 일치하는 지 확인함)
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [userId, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(userId);

        if (userInfoRows[0].status === "F") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        }

        console.log(userInfoRows[0].idx) // DB의 userId
        const userIdx = userInfoRows[0].idx;
        const userName = userInfoRows[0].userName;

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].idx,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId': userIdx, 'userName' : userName, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUser = async function (id, userName) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, userName)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
