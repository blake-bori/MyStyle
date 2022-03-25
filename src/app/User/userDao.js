

// 모든 유저 조회
async function selectUser(connection, userId) {
  const selectUserListQuery = `
    SELECT email, userName
    FROM UserInfo;
  `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 유저가 좋아요한 상의 목록 조회
async function selectUserHeartTopList(connection, userIdx) {
  const selectUserListQuery = `
    select distinct clothesIdx, name, mysize, imgUrl, concat(format(price, 0), '원') as price
    from MyList join Clothes on clothesIdx=Clothes.idx
    where userIdx = ? and type=1 and MyList.status = 'T';
  `;
  const [userRows] = await connection.query(selectUserListQuery, userIdx);
  return userRows;
}

// 유저가 좋아요한 목록 조회
async function selectUserHeartList(connection, userIdx) {
  const selectUserListQuery = `
    select name, mysize
    from MyList join Clothes on clothesIdx=Clothes.idx
    where userIdx = ? and MyList.status='T';
  `;
  const [userRows] = await connection.query(selectUserListQuery, userIdx);
  return userRows;
}

// 유저가 좋아요한 하의 목록 조회
async function selectUserHeartBottomList(connection, userIdx) {
  const selectUserListQuery = `
    select distinct clothesIdx, name, mysize, imgUrl, concat(format(price, 0), '원') as price
    from MyList join Clothes on clothesIdx=Clothes.idx
    where userIdx = ? and type=2 and MyList.status='T';
  `;
  const [userRows] = await connection.query(selectUserListQuery, userIdx);
  return userRows;
}

// 유저 추천 리스트 조회
async function selectUserRecommendList(connection, userIdx) {
  const selectUserListQuery = `
    select idx as clothesIdx, name
    from Clothes
    order by rand() limit 5;
  `;
  const [userRows] = await connection.query(selectUserListQuery, userIdx);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickname 
                FROM UserInfo 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT id, email, nickname 
                 FROM UserInfo 
                 WHERE id = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// 유저 정보 조회
async function selectUserInfo(connection, userIdx) {
  const selectUserIdQuery = `
    select idx as userIdx, userName, userId, email,
           concat(substring(phoneNum, 1, 3), '-', substring(phoneNum, 4, 4), '-', substring(phoneNum, 8, 4)) as phoneNum
    from UserInfo
    where idx=?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userIdx);
  return userRow;
}

// userId 회원 존재하는지 확인
async function selectUserExist(connection, userId) {
  const selectUserIdQuery = `
    select userId
    from UserInfo
    where userId=?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

async function selectUserIdxExist(connection, userIdx) {
  const selectUserIdQuery = `
    select idx
    from UserInfo
    where idx=?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userIdx);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO UserInfo(userId, userName, password)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 유저 생성(사이즈 정보 입력)
async function insertUserSizeInfo(connection, insertUserInfoParams) {
  const insertUserSizeInfoQuery = `
        INSERT INTO UserSize(userIdx, gender, height, weight, proportion, muscle)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
  const insertUserSizeInfoRow = await connection.query(
      insertUserSizeInfoQuery,
      insertUserInfoParams
  );

  return insertUserSizeInfoRow;
}

// 유저 모델 입력
async function insertUsermodel(connection, params) {
  const insertUserSizeInfoQuery = `
    UPDATE UserSize
    SET usermodel = ?
    WHERE userIdx = ?;
    `;
  const insertUserSizeInfoRow = await connection.query(
      insertUserSizeInfoQuery,
      params
  );

  return insertUserSizeInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT userId, password
        FROM UserInfo 
        WHERE userId = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, userId) {
  const selectUserAccountQuery = `
        SELECT idx, status, userName
        FROM UserInfo 
        WHERE userId = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      userId
  );
  return selectUserAccountRow[0];
}

// 유저 정보 수정
async function updateUserInfo(connection, id, userName) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET userName = ?
  WHERE idx = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [userName, id]);
  return updateUserRow[0];
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  selectUserExist,
  selectUserIdxExist, insertUserSizeInfo, selectUserHeartTopList
  , selectUserHeartBottomList, selectUserRecommendList,
  selectUserInfo, selectUserHeartList, insertUsermodel

};
