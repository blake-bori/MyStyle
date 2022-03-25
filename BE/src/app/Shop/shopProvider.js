const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const shopDao = require("./shopDao");


exports.retrieveClothes = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    // Transaction 처리
    try {
        await connection.beginTransaction();
        const clothes = await shopDao.selectClothes(connection);

        await connection.commit();

        // 8개 랜덤으로 가져오기
        for (let i = 0; i < clothes.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [clothes[i], clothes[j]] = [clothes[j], clothes[i]];
        }

        let clothesList = clothes.slice(0, 8);

        return response(baseResponse.SUCCESS, clothesList);
    } catch (err) {
        console.log(err)
        await connection.rollback(); // 롤백
        return errResponse(baseResponse.DB_ERROR, err);
    } finally {
        connection.release();
    }

};

exports.retrieveAllClothes = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    // Transaction 처리
    try {
        await connection.beginTransaction();
        const clothes = await shopDao.selectClothes(connection);

        await connection.commit();

        
        for (let i = 0; i < clothes.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [clothes[i], clothes[j]] = [clothes[j], clothes[i]];
        }

        return response(baseResponse.SUCCESS, clothes);
    } catch (err) {
        console.log(err)
        await connection.rollback(); // 롤백
        return errResponse(baseResponse.DB_ERROR, err);
    } finally {
        connection.release();
    }

};

exports.retrieveTops = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const tops = await shopDao.selectTops(connection);

    connection.release();
    return response(baseResponse.SUCCESS, tops);;
};

exports.retrievePants = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const pants = await shopDao.selectPants(connection);

    connection.release();
    return response(baseResponse.SUCCESS, pants);;
};

exports.retrieveMenClothes = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
        await connection.beginTransaction();
        const clothes = await shopDao.selectMenClothes(connection);

        await connection.commit();

        for (let i = 0; i < clothes.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [clothes[i], clothes[j]] = [clothes[j], clothes[i]];
        }

        return response(baseResponse.SUCCESS, clothes);
    } catch (err) {
        console.log(err)
        await connection.rollback(); // 롤백
        return errResponse(baseResponse.DB_ERROR, err);
    } finally {
        connection.release();
    }
};

exports.retrieveWomenClothes = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
        await connection.beginTransaction();
        const clothes = await shopDao.selectWomenClothes(connection);

        await connection.commit();

        for (let i = 0; i < clothes.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [clothes[i], clothes[j]] = [clothes[j], clothes[i]];
        }

        return response(baseResponse.SUCCESS, clothes);

    } catch (err) {
        console.log(err)
        await connection.rollback(); // 롤백
        return errResponse(baseResponse.DB_ERROR, err);
    } finally {
        connection.release();
    }
};

exports.retrieveClothesInfo = async function (clothesIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
        await connection.beginTransaction();
        const clothes = await shopDao.selectClothesInfo(connection, clothesIdx);


        await connection.commit();

        const result = [{"clothes" : clothes[0]}]
        return  response(baseResponse.SUCCESS, result);

    } catch (err) {
        console.log(err)
        await connection.rollback(); // 롤백
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

exports.retrieveClothesCategory = async function (clothesIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesCategoryResult = await shopDao.selectClothesCategory(connection, clothesIdx);
    connection.release();

    return clothesCategoryResult;
};

exports.checkModel = async function (userIdx, topIdx, topSize, bottomIdx, bottomSize) {
    const params = [userIdx, topIdx, topSize, bottomIdx, bottomSize]
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesModelResult = await shopDao.selectClothesModel(connection, params);
    connection.release();

    return clothesModelResult;
};

exports.clothesModelByIdx = async function (userIdx, topIdx, topSize, bottomIdx, bottomSize) {
    const params = [userIdx, topIdx, topSize, bottomIdx, bottomSize]
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesModelResult = await shopDao.selectClothesModel(connection, params);
    connection.release();

    return clothesModelResult;
};

exports.retrieveCurClothes = async function (clothesIdx, userIdx) {

    const connection = await pool.getConnection(async (conn) => conn);
    const curClothesResult = await shopDao.selectCurClothes(connection, userIdx);
    connection.release();

    return curClothesResult;
};


exports.retrieveClothesModel = async function (userIdx, clothesIdx, size, bottomIdx, bottomSize) {
    const params = [userIdx, clothesIdx, size, bottomIdx, bottomSize];
    console.log(params)
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesModelResult = await shopDao.selectClothesModel(connection, params);
    console.log(clothesModelResult)
    connection.release();

    return clothesModelResult;
};

exports.topByClothesIdx = async function (topIdx) {

    const connection = await pool.getConnection(async (conn) => conn);
    const clothesResult = await shopDao.checkTopExists(connection, topIdx);
    connection.release();

    return clothesResult;
};

exports.bottomByClothesIdx = async function (bottomIdx) {

    const connection = await pool.getConnection(async (conn) => conn);
    const clothesResult = await shopDao.checkBottomExists(connection, bottomIdx);
    connection.release();

    return clothesResult;
};

exports.retrieveTopModel = async function (userIdx, clothesIdx, size) {
    const params = [userIdx, clothesIdx, size];
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesModelResult = await shopDao.selectTopModel(connection, params);
    connection.release();

    return clothesModelResult;
};

exports.retrieveBottomModel = async function (userIdx, clothesIdx, size) {
    const params = [userIdx, clothesIdx, size];
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesModelResult = await shopDao.selectBottomModel(connection, params);
    connection.release();

    return clothesModelResult;
};

exports.userByUserIdxCheck = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userCheckResult = await shopDao.selectUserIdxExist(connection, userIdx);
    connection.release();

    return userCheckResult;
};

exports.clothesByClothesIdx = async function (clothesIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesCheckResult = await shopDao.selectClothesIdxExist(connection, clothesIdx);
    connection.release();

    return clothesCheckResult;
};

exports.heartCheck = async function (clothesIdx, userIdx) {
    const params = [clothesIdx, userIdx]
    const connection = await pool.getConnection(async (conn) => conn);
    const heartCheckResult = await shopDao.checkHeart(connection, params);
    connection.release();

    return heartCheckResult;
};

exports.heartStatusCheck = async function (clothesIdx, userIdx) {
    const params = [clothesIdx, userIdx]
    const connection = await pool.getConnection(async (conn) => conn);
    const heartResult = await shopDao.checkHeartStatus(connection, params);
    console.log(heartResult[0].heartExist);
    connection.release();

    return heartResult;
};

exports.clothesTypeByIdx = async function (clothesIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesCheckResult = await shopDao.selectClothesTypeByIdx(connection, clothesIdx);
    connection.release();

    return clothesCheckResult;
};

exports.heartCheckByType = async function (userIdx, type) {
    const params = [type, userIdx]
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesCheckResult = await shopDao.selectHeartByType(connection, params);
    connection.release();

    return clothesCheckResult;
};

exports.checkHeartStatus = async function (userIdx, clothesIdx, size) {
    const params = [userIdx, clothesIdx, size]
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesCheckResult = await shopDao.selectHeartStatusByIdx(connection, params);
    connection.release();

    return clothesCheckResult;
};

exports.checkHeartExists = async function (userIdx, clothesIdx, size) {
    const params = [userIdx, clothesIdx, size]
    const connection = await pool.getConnection(async (conn) => conn);
    const clothesCheckResult = await shopDao.selectHeartExistsByIdx(connection, params);
    connection.release();

    return clothesCheckResult;
};
