const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");


exports.retrieveUserList = async function (email) {

  //email을 인자로 받는 경우와 받지 않는 경우를 구분하여 하나의 함수에서 두 가지 기능을 처리함

  if (!email) {
    // connection 은 db와의 연결을 도와줌
    const connection = await pool.getConnection(async (conn) => conn);
    // Dao 쿼리문의 결과를 호출
    const userListResult = await userDao.selectUser(connection);
    // connection 해제
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.retrieveUserHeart = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  // Transaction 처리
  try {
    await connection.beginTransaction();

    const heartTopList = await userDao.selectUserHeartTopList(connection, userIdx);
    const heartBottomList = await userDao.selectUserHeartBottomList(connection, userIdx);
    const recommendList = await userDao.selectUserRecommendList(connection, userIdx);

    const heartList = {"top" : heartTopList, "bottom" : heartBottomList, "recommend" : recommendList};

    await connection.commit();
    return heartList;;

  } catch (err) {
    console.log(err);
    await connection.rollback();
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();

  }



};

exports.retrieveUserInfo = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  // Transaction 처리
  try {
    await connection.beginTransaction();

    const userResult = await userDao.selectUserInfo(connection, userIdx);
    console.log(userResult)

    const heartList = await userDao.selectUserHeartList(connection, userIdx);

    console.log(heartList)

    const result = {"myinfo" : userResult[0], "heartList" : heartList};

    await connection.commit();
    return result;

  } catch (err) {
    console.log(err);
    await connection.rollback();
    return err
  } finally {
    connection.release();

  }
  //connection.release();

  return userResult;
};

exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  // Transaction 처리
  try {
    await connection.beginTransaction();

    console.log(userId)
    const userResult = await userDao.selectUserId(connection, userId);
    const heartList = await userDao.selectUserHeartList(connection, userId);
    console.log(userResult)
    console.log(heartList)

    const result = {"myinfo" : userResult[0], "heartList" : heartList};

    await connection.commit();
    return result;

  } catch (err) {
    console.log(err);
    await connection.rollback();
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();

  }

};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.userCheck = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userCheckResult = await userDao.selectUserExist(connection, userId);
  connection.release();

  return userCheckResult;
};

exports.userByUserIdxCheck = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userCheckResult = await userDao.selectUserIdxExist(connection, userIdx);
  connection.release();

  return userCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, userId);
  connection.release();

  return userAccountResult;
};
