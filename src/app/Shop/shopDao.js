// 메인 페이지에서의 모든 옷 조회
async function selectClothes(connection) {
    const selectClothesListQuery = `
        select idx, imgUrl, name, price, isRecommend, gender
        from Clothes;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery);
    return clothesRows;
}
// 상의만 조회
async function selectTops(connection) {
    const selectClothesListQuery = `
        select idx, imgUrl, name, price
        from Clothes
        where type=1;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery);
    return clothesRows;
}

// 하의만 조회
async function selectPants(connection) {
    const selectClothesListQuery = `
        select idx, imgUrl, name, price
        from Clothes
        where type=2;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery);
    return clothesRows;
}

// 남성 옷 조회
async function selectMenClothes(connection) {
    const selectClothesListQuery = `
        select idx, imgUrl, name, price
        from Clothes
        where gender=3;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery);
    return clothesRows;
}


// 여성 옷 조회
async function selectWomenClothes(connection) {
    const selectClothesListQuery = `
        select idx, imgUrl, name, price
        from Clothes
        where gender=2;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery);
    return clothesRows;
}

// 옷 상세 페이지 조회
async function selectClothesInfo(connection, clothesIdx) {
    const selectClothesListQuery = `
        select Clothes.idx as clothesIdx, name, price
             , imgUrl, description, 3dmodel as model
        from Clothes join ClothesInfo on Clothes.idx=clothesIdx
        where Clothes.idx=?;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery, clothesIdx);
    return clothesRows;
}

// 찜하기 상태 조회
async function selectClothesHeart(connection, clothesIdx, userIdx) {
    const query = [clothesIdx, userIdx];
    const selectClothesListQuery = `
        select status
        from MyList
        where clothesIdx=? and userIdx=?;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery, query);
    return clothesRows;
}

// 옷의 사이즈 조회
async function selectClothesSize(connection, clothesIdx) {
    const selectClothesListQuery = `
        select ClothesSize.idx as sizeIdx, sizeName
        from ClothesSize
        where clothesIdx=?;
  `;
    const [clothesRows] = await connection.query(selectClothesListQuery, clothesIdx);
    return clothesRows;
}

// 사용자 idx 존재하는지 확인
async function selectUserIdxExist(connection, userIdx) {
    const selectUserIdQuery = `
    select idx
    from UserInfo
    where idx=?;
                 `;
    const [userRow] = await connection.query(selectUserIdQuery, userIdx);
    return userRow;
}

// 옷 idx 존재하는지 확인
async function selectClothesIdxExist(connection, clothesIdx) {
    const selectClothesIdQuery = `
    select idx
    from Clothes
    where idx=?;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, clothesIdx);
    return clothesRow;
}

// 옷의 종류 
async function selectClothesCategory(connection, clothesIdx) {
    const selectClothesIdQuery = `
    select type
    from Clothes
    where idx=?;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, clothesIdx);
    return clothesRow;
}

async function selectCurClothes(connection, userIdx) {
    const selectClothesIdQuery = `
    select topIdx, topSize, bottomIdx, bottomSize
    from CurModels
    where userIdx=?;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, userIdx);
    return clothesRow;
}

async function selectTopModel(connection, params) {
    const selectClothesIdQuery = `
    select 3durl as model
    from 3DModels
    where userIdx=? and topIdx=? and topSize=?;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, params);
    return clothesRow;
}

async function selectBottomModel(connection, params) {
    const selectClothesIdQuery = `
    select 3durl as model
    from 3DModels
    where userIdx=? and bottomIdx=? and bottomSize=?;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, params);
    return clothesRow;
}

async function selectClothesModel(connection, params) {
    const selectClothesIdQuery = `
        select 3durl as model, topIdx, topSize, bottomIdx, bottomSize
        from 3DModels
        where userIdx=? and topIdx=? and topSize=? and bottomIdx = ? and bottomSize = ?;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, params);
    return clothesRow;
}

async function selectUserModel(connection, params) {
    const selectClothesIdQuery = `
    select 3durl as model
    from 3DModels
    where userIdx=? and topIdx=? and topSize=? and bottomIdx=? and bottomSize=?;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, params);
    return clothesRow;
}


async function checkHeart(connection, params) {
    const selectClothesIdQuery = `
        select exists(select status from MyList where clothesIdx=? and userIdx=? and status='T') as heartExist;
                 `;
    const [clothesRow] = await connection.query(selectClothesIdQuery, params);
    return clothesRow;
}

// 좋아요의 status 조회
async function checkHeartStatus(connection, params) {
    const selectHeartQuery = `
        select status
        from MyList
        where clothesIdx=? and userIdx=?;
                `;
    const [heartRows] = await connection.query(selectHeartQuery, params);
    return heartRows;
}

async function selectClothesTypeByIdx(connection, params) {
    const selectHeartQuery = `
        select type
        from Clothes
        where idx=?;
                `;
    const [heartRows] = await connection.query(selectHeartQuery, params);
    return heartRows;
}

async function selectHeartByType(connection, params) {
    const selectHeartQuery = `
        select Clothes.idx
        from MyList join Clothes on clothesIdx = Clothes.idx and type=?
        where userIdx=? and MyList.status='T';
                `;
    const [heartRows] = await connection.query(selectHeartQuery, params);
    return heartRows;
}

async function selectHeartStatusByIdx(connection, params) {
    const selectHeartQuery = `
        select status
        from MyList
        where userIdx=? and clothesIdx=? and mysize=?;
                `;
    const [heartRows] = await connection.query(selectHeartQuery, params);
    return heartRows;
}

async function selectHeartExistsByIdx(connection, params) {
    const selectHeartQuery = `
        select idx
        from MyList
        where userIdx=? and clothesIdx=? and mysize=? and status='T';
                `;
    const [heartRows] = await connection.query(selectHeartQuery, params);
    return heartRows;
}

// 상의가 존재하는지 확인
async function checkTopExists(connection, topIdx) {
    const selectHeartQuery = `
        select idx
        from Clothes
        where idx=? and type=1;
                `;
    const [heartRows] = await connection.query(selectHeartQuery, topIdx);
    return heartRows;
}

// 하의가 존재하는지 확인
async function checkBottomExists(connection, bottomIdx) {
    const selectHeartQuery = `
        select idx
        from Clothes
        where idx=? and type=2;
                `;
    const [heartRows] = await connection.query(selectHeartQuery, bottomIdx);
    return heartRows;
}

async function updateHeartStatus(connection, insertHeartParams) {
    const updateUserQuery = `
  UPDATE MyList 
  SET status = ?, mysize = ?
  WHERE clothesIdx = ? and userIdx = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, insertHeartParams);
    return updateUserRow[0];
}

async function updateClothesHeartStatus(connection, insertHeartParams) {
    const updateUserQuery = `
  UPDATE MyList 
  SET status = ?
  WHERE userIdx = ? and  clothesIdx= ? and mysize = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, insertHeartParams);
    return updateUserRow[0];
}

async function updateCurmodelStatus(connection, params) {
    const updateUserQuery = `
  UPDATE CurModels 
  SET topIdx = ?, topSize = ?
  WHERE userIdx = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, params);
    return updateUserRow[0];
}

async function updateCurmodelBottomStatus(connection, params) {
    const updateUserQuery = `
  UPDATE CurModels 
  SET bottomIdx = ?, bottomSize = ?
  WHERE userIdx = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, params);
    return updateUserRow[0];
}

// 좋아요 status F로 업데이트하기
async function patchHeartStatusByIdx(connection, params) {
    const updateUserQuery = `
        UPDATE MyList
        SET status = 'F'
        WHERE userIdx = ? and  clothesIdx= ? and mysize = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, params);
    return updateUserRow[0];
}

// 좋아요하기
async function insertHeart(connection, insertHeartParams) {
    const insertHeartQuery = `
        INSERT INTO MyList(userIdx, clothesIdx, mysize)
        VALUES (?, ?, ?);
    `;
    const insertHeartRow = await connection.query(
        insertHeartQuery,
        insertHeartParams
    );

    return insertHeartRow;
}

// 좋아요 db에 추가
async function postHeartByIdx(connection, insertHeartParams) {
    const insertHeartQuery = `
        INSERT INTO MyList(userIdx, clothesIdx, mysize)
        VALUES (?, ?, ?);
    `;
    const insertHeartRow = await connection.query(
        insertHeartQuery,
        insertHeartParams
    );

    return insertHeartRow;
}

// 주문 db 추가
async function insertOrder(connection, insertHeartParams) {
    const insertHeartQuery = `
        INSERT INTO Purchase(userIdx, clothesIdx, size)
        VALUES (?, ?, ?);
    `;
    const insertHeartRow = await connection.query(
        insertHeartQuery,
        insertHeartParams
    );

    return insertHeartRow;
}

async function insertModel(connection, params) {
    const insertCurModelQuery = `
        INSERT INTO 3DModels(userIdx, topIdx, topSize, bottomIdx, bottomSize, 3durl)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const insertCurModelRow = await connection.query(
        insertCurModelQuery,
        params
    );

    return insertCurModelRow;
}

async function insertCurModel(connection, params) {
    const insertCurModelQuery = `
        INSERT INTO CurModels(userIdx, topIdx, topSize)
        VALUES (?, ?, ?);
    `;
    const insertCurModelRow = await connection.query(
        insertCurModelQuery,
        params
    );

    return insertCurModelRow;
}

async function insertCurModelBottom(connection, params) {
    const insertCurModelQuery = `
        INSERT INTO CurModels(userIdx, bottomIdx, bottomSize)
        VALUES (?, ?, ?);
    `;
    const insertCurModelRow = await connection.query(
        insertCurModelQuery,
        params
    );

    return insertCurModelRow;
}

module.exports = {
    selectClothes, selectTops, selectPants, selectMenClothes, selectWomenClothes,
    selectUserIdxExist, selectClothesIdxExist, checkHeart, checkHeartStatus,
    updateHeartStatus, insertHeart, insertOrder, selectClothesInfo, selectClothesHeart,
    selectClothesSize, selectClothesCategory, selectCurClothes, updateCurmodelStatus,
    selectTopModel, insertCurModel, selectUserModel, insertCurModelBottom,
    selectClothesModel, selectBottomModel, updateCurmodelBottomStatus,
    selectClothesTypeByIdx, selectHeartByType, updateClothesHeartStatus,
    selectHeartStatusByIdx, postHeartByIdx, selectHeartExistsByIdx,
    patchHeartStatusByIdx, checkTopExists, checkBottomExists, insertModel
};
