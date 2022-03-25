const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

const shopProvider = require("./shopProvider");
const shopDao = require("./shopDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");


exports.createHeart = async function (clothesIdx, userIdx, size) {
    try {

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertHeartParams = [userIdx, clothesIdx, size];

        const connection = await pool.getConnection(async (conn) => conn);

        const insertHeartResult = await shopDao.insertHeart(connection, insertHeartParams);
        console.log(`추가된 회원 : ${insertHeartResult[0].insertId}`);

        connection.release();
        return "heart success";

    } catch (err) {
        logger.error(`App - createHeart Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createOrder = async function (clothesIdx, userIdx, size) {
    try {

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertOrderParams = [userIdx, clothesIdx, size];

        const connection = await pool.getConnection(async (conn) => conn);

        const insertOrderResult = await shopDao.insertOrder(connection, insertOrderParams);
        console.log(`추가된 회원 : ${insertOrderResult[0].insertId}`);

        connection.release();
        return insertOrderResult[0].insertId;

    } catch (err) {
        logger.error(`App - createOrder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postModel = async function (userIdx, topIdx, topSize, bottomIdx, bottomSize, model) {
    try {

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const params = [userIdx, topIdx, topSize, bottomIdx, bottomSize, model];

        const connection = await pool.getConnection(async (conn) => conn);

        const insertModelResult = await shopDao.insertModel(connection, params);
        console.log(`추가된 모델 : ${insertModelResult[0].insertId}`);

        connection.release();
        return response(baseResponse.SUCCESS, model);;

    } catch (err) {
        logger.error(`App - postModel Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postCurModel = async function (userIdx, clothesIdx, size) {
    try {

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const params = [userIdx, clothesIdx, size];

        const connection = await pool.getConnection(async (conn) => conn);

        const insertCurModelResult = await shopDao.insertCurModel(connection, params);
        console.log(`추가된 회원 : ${insertCurModelResult[0].insertId}`);

        connection.release();
        return insertCurModelResult[0].insertId;

    } catch (err) {
        logger.error(`App - postCurModel Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postCurModelBottom = async function (userIdx, clothesIdx, size) {
    try {

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const params = [userIdx, clothesIdx, size];

        const connection = await pool.getConnection(async (conn) => conn);

        const insertCurModelResult = await shopDao.insertCurModelBottom(connection, params);
        console.log(`추가된 회원 : ${insertCurModelResult[0].insertId}`);

        connection.release();
        return insertCurModelResult[0].insertId;

    } catch (err) {
        logger.error(`App - postCurModel Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postHeart = async function (userIdx, clothesIdx, size) {
    try {

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const params = [userIdx, clothesIdx, size];

        const connection = await pool.getConnection(async (conn) => conn);

        const insertCurModelResult = await shopDao.postHeartByIdx(connection, params);
        console.log(`추가된 회원 : ${insertCurModelResult[0].insertId}`);

        connection.release();
        return insertCurModelResult[0].insertId;

    } catch (err) {
        logger.error(`App - postHeart Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.patchHeartStatus = async function (status, clothesIdx, userIdx, size) {
    try {
        console.log('patchHeartStatus');
        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const updateHeartParams = [status, size, clothesIdx, userIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        const heartResult = await shopDao.updateHeartStatus(connection, updateHeartParams);

        console.log(status);
        connection.release();
        return status;

    } catch (err) {
        logger.error(`App - patchHeartStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.patchCurModel = async function (clothesIdx, userIdx, size) {
    try {
        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const updateCurModelParams = [clothesIdx, size, userIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        const curmodelResult = await shopDao.updateCurmodelStatus(connection, updateCurModelParams);

        connection.release();
        return curmodelResult;

    } catch (err) {
        logger.error(`App - patchCurModel Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.patchCurModelBottom = async function (clothesIdx, userIdx, size) {
    try {
        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const updateCurModelParams = [clothesIdx, size, userIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        const curmodelResult = await shopDao.updateCurmodelBottomStatus(connection, updateCurModelParams);

        connection.release();
        return curmodelResult;

    } catch (err) {
        logger.error(`App - patchCurModelBottom Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateHeartStatus = async function (userIdx, clothesIdx, size) {
    try {
        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const params = ['T', userIdx, clothesIdx, size];

        const connection = await pool.getConnection(async (conn) => conn);

        const heartResult = await shopDao.updateClothesHeartStatus(connection, params);

        connection.release();
        return heartResult;

    } catch (err) {
        logger.error(`App - updateHeartStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateHeartStatusByIdx = async function (userIdx, clothesIdx, size) {
    try {
        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const params = [userIdx, clothesIdx, size];

        const connection = await pool.getConnection(async (conn) => conn);

        const heartResult = await shopDao.patchHeartStatusByIdx(connection, params);

        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - updateHeartStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
