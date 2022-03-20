<<<<<<< HEAD
const jwtMiddleware = require("../../../config/jwtMiddleware");
const shopProvider = require("../../app/Shop/shopProvider");
const shopService = require("../../app/Shop/shopService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
var cors = require('cors');

const { PythonShell } = require("python-shell");

const s3Client = require("../../../config/s3");
// const multer  = require('multer');
var formidable = require('formidable')
var fs = require('fs');
const AWS = require('aws-sdk');

/**
 * API No. 6
 * API Name : 메인 페이지(인기 순, 추천리스트) API
 * [GET] /app/shop/main?sort=
 */
exports.getShopList = async function (req, res) {

    const sort = req.query.sort;

    // 인기순, 최신순의 나열 방식 입력
    // 지금은 그냥 일단 랜덤순으로 출력!
    console.log('main sort: ' + sort);

    const clothes = await shopProvider.retrieveClothes();

    return res.send(clothes);

}

/**
 * API No. 7
 * API Name : 쇼핑 페이지(전체 조회, 바지, 상의, 여성, 남성) API
 * [GET] /app/shop?category=?sort=
 */
exports.getShopCategoryList = async function (req, res) {

    const category = req.query.category;
    const sort = req.query.sort;

    // 인기순, 최신순의 나열 방식 입력
    console.log('category' + category);
    console.log('sort ' + sort);
    // 지금은 그냥 일단 랜덤순으로 출력!
    let clothes;

    if (!category) {
        clothes = await shopProvider.retrieveAllClothes();
    }

    if (category == "top") {
        console.log('top')
        clothes = await shopProvider.retrieveTops();
    }

    else if (category == "bottom") {
        console.log('bottom')
        clothes = await shopProvider.retrievePants();
    }

    else if (category == "men") {
        console.log('men')
        clothes = await shopProvider.retrieveMenClothes();
    }

    else if (category == "women") {
        console.log('women')
        clothes = await shopProvider.retrieveWomenClothes();
    }

    else {
        console.log('else')
        clothes = await shopProvider.retrieveAllClothes();
    }

    return res.send(clothes);

}

/**
 * API No. 8
 * API Name : 상품 페이지(자세한 정보) API
 * [GET] /app/shop/clothes/:clothesIdx
 */
exports.getClothesInfo = async function (req, res) {


    const clothesIdx = req.params.clothesIdx;
    // const userIdx = req.params.userIdx;

    // if (!userIdx)
    //     return res.send(response(baseResponse.USER_USERID_EMPTY));
    if (!clothesIdx)
        return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_EMPTY));

    // 존재하지 않는 유저인지 확인
    // const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    // console.log(userRows)
    // if (userRows.length < 1)
    //     return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

        const clothesRows = await shopProvider.clothesByClothesIdx(clothesIdx);
        console.log(clothesRows)
        if (clothesRows.length < 1)
            return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

        const clothesResult = await shopProvider.retrieveClothesInfo(clothesIdx);

        return res.send(clothesResult);

}

/**
 * API No. 9
 * API Name : 옷 찜하기 API
 * [POST] /app/shop/heart
 */
exports.postHeart = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    const {userIdx, clothesIdx, size} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const clothesRows = await shopProvider.clothesByClothesIdx(clothesIdx);
    console.log(clothesRows)
    if (clothesRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

    //이미 찜한 옷인지 확인
    const heartClothes = await shopProvider.checkHeartExists(userIdx, clothesIdx, size);
    console.log(heartClothes)
    if (heartClothes.length>0)
        return res.send(response(baseResponse.HEART_CLOTHES_EXIST));

   //상하의인지 가져오고 현재 db에 각 유저가 4개 있으면 거절하기
    //상의: 1, 하의: 2
    const clothesType = await shopProvider.clothesTypeByIdx(clothesIdx);
    console.log(clothesType[0].type)
    const checkTypeNum = await shopProvider.heartCheckByType(userIdx, clothesType[0].type);
    console.log(checkTypeNum)
    if (checkTypeNum.length >= 4)
        return res.send(response(baseResponse.CLOTHES_TYPE_OVER));

    // db에 status F로 있으면 status T로 바꿈, 없으면 새로 만들기
    const checkStatus = await shopProvider.checkHeartStatus(userIdx, clothesIdx, size);
    console.log(checkStatus)
    if (checkStatus.status == 'F') {
        const updateStatus = await shopService.updateHeartStatus(userIdx, clothesIdx, size);
        res.send(response(baseResponse.SUCCESS))
    }
    else {
        const createHeart = await shopService.postHeart(userIdx, clothesIdx, size);
        res.send(response(baseResponse.SUCCESS))
    }

};

/**
 * API No. 14
 * API Name : 옷 찜 취소하기 API
 * [PATCH] /app/shop/heart
 */
exports.patchHeart = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    const {userIdx, clothesIdx, size} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const clothesRows = await shopProvider.clothesByClothesIdx(userIdx);
    console.log(clothesRows)
    if (clothesRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

    //이미 찜한 옷인지 확인
    const heartClothes = await shopProvider.checkHeartExists(userIdx, clothesIdx, size);
    console.log(heartClothes)
    if (heartClothes.length<1)
        return res.send(response(baseResponse.HEART_CLOTHES_NOT_EXIST));

    const patchHeart = shopService.updateHeartStatusByIdx(userIdx, clothesIdx, size);
    return res.send(response(baseResponse.SUCCESS))
};


/**
 * API No. 10
 * API Name : 옷 구매하기 API
 * [POST] /app/shop/purchase
 */
exports.postPurchase = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    const {userIdx, clothesIdx, size} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const clothesRows = await shopProvider.clothesByClothesIdx(clothesIdx);
    console.log(clothesRows)
    if (clothesRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));


    const orderResponse = await shopService.createOrder(clothesIdx, userIdx, size);

    res.send(response(baseResponse.SUCCESS))
};

/**
 * API No. 10
 * API Name : 옷 피팅한 모델 가져오기 API
 * [POST] /app/shop/model
 */
// userIdx, clothesIdx, size로 현재 curModel에 가서 clothesIdx의 category확인하고 해당 category가 있으면 clothesIdx로 수정하고
// 3dModels가서 해당 링크 가져오기..?
exports.postModel = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    //const {userIdx, clothesIdx, size} = req.body;
    const {userIdx, topIdx, topSize, bottomIdx, bottomSize} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if (!topIdx)
        return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_EMPTY));
    if (!bottomIdx)
        return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const topRows = await shopProvider.topByClothesIdx(topIdx);
    console.log(topRows)
    if (topRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));
    const bottomRows = await shopProvider.bottomByClothesIdx(bottomIdx);
    console.log(bottomRows)
    if (bottomRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));


    // DB에 저장된 모델이 있는지 확인
    // 유저 모델 바꿀수도 있으니까
    // const modelRow = await shopProvider.checkModel(userIdx, topIdx, topSize, bottomIdx, bottomSize);
    // if (modelRow.length>0) return res.send(response(baseResponse.SUCCESS, modelRow[0].model));

    // 없으면 모델 생성
    var topFile = '';
    var bottomFile = '';
    if (topIdx==1) {
        console.log('검은반팔')
        if (topSize == 's') topFile = 'top(black)_S.obj'
        else if (topSize == 'm') topFile = 'top(black)_M.obj'
        else if (topSize == 'l') topFile = 'top(black)_L.obj'
        else if (topSize == 'xl') topFile = 'top(black)_XL.obj'
        else return res.send(response(baseResponse.CLOTHES_SIZE_INVALID));
    }
    // 청바지
    if (bottomIdx==11) {
        console.log('청바지')
        if (bottomSize == 's') bottomFile = 'S_01.obj'
        else if (bottomSize == 'm') bottomFile = 'M_01.obj'
        else if (bottomSize == 'l') bottomFile = 'L_01.obj'
        else if (bottomSize == 'xl') bottomFile = 'XL_01.obj'
        else return res.send(response(baseResponse.CLOTHES_SIZE_INVALID));
    }
    // 연청바지
    if (bottomIdx==12) {
        console.log('연청바지')
        if (bottomSize == 's') bottomFile = 'S_02.obj'
        else if (bottomSize == 'm') bottomFile = 'M_02.obj'
        else if (bottomSize == 'l') bottomFile = 'L_02.obj'
        else if (bottomSize == 'xl') bottomFile = 'XL_02.obj'
        else return res.send(response(baseResponse.CLOTHES_SIZE_INVALID));
    }
    // 카키 조거
    if (bottomIdx==9) {
        console.log('카키 조거')
        if (bottomSize == 's') bottomFile = 'S_03.obj'
        else if (bottomSize == 'm') bottomFile = 'M_03.obj'
        else if (bottomSize == 'l') bottomFile = 'L_03.obj'
        else if (bottomSize == 'xl') bottomFile = 'XL_03.obj'
        else return res.send(response(baseResponse.CLOTHES_SIZE_INVALID));
    }
    // 블랙 조거
    if (bottomIdx==8) {
        console.log('블랙 조거')
        if (bottomSize == 's') bottomFile = 'S_04.obj'
        else if (bottomSize == 'm') bottomFile = 'M_04.obj'
        else if (bottomSize == 'l') bottomFile = 'L_04.obj'
        else if (bottomSize == 'xl') bottomFile = 'XL_04.obj'
        else return res.send(response(baseResponse.CLOTHES_SIZE_INVALID));
    }
    // 슬랙스
    if (bottomIdx==10) {
        console.log('슬랙스')
        if (bottomSize == 's') bottomFile = 'S_05.obj'
        else if (bottomSize == 'm') bottomFile = 'M_05.obj'
        else if (bottomSize == 'l') bottomFile = 'L_05.obj'
        else if (bottomSize == 'xl') bottomFile = 'XL_05.obj'
        else return res.send(response(baseResponse.CLOTHES_SIZE_INVALID));
    }

    let resultLocation = Date.now() + 'result.glb'
    var userDir = './user'+userIdx+'/test.obj';
    var usermodel = ''


    var python = require('python-shell');
    var options = {
        mode: 'text',
        scriptPath: '',
        args: [userDir, topFile, bottomFile, resultLocation,175]
    };
    PythonShell.run('modeling.py', options, function (err, results) {
        if (err) {
            console.log(err)
            throw err;
        }
        console.log(results);

        fs.readFile(resultLocation, async function (err, data) {
            if (err) {
                console.log(err.toString())
                return res.send(response(baseResponse.MODEL_UPLOAD_ERROR));
            }

            // S3 upload
            var bucketName = 'usermodel'

            const s3 = new AWS.S3({
                accessKeyId: s3Client.accessid,
                secretAccessKey: s3Client.secret,
                region: 'ap-northeast-2',
                Bucket: bucketName
            });

            const params = {
                Bucket: 'usermodel',
                Key: resultLocation,
                Body: data
            };
            s3.upload(params, async function(err, data) {
                if (err) {
                    //throw err;
                    console.log('error')
                    console.log(err)
                } else {
                    console.log(`File uploaded successfully.`);
                    console.log(data.Location)
                    //res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
                    const uploadModel = await shopService.postModel(userIdx, topIdx, topSize, bottomIdx, bottomSize, data.Location);
                    fs.unlink(resultLocation, err => {
                        if(err){
                            console.log("파일 삭제 Error 발생");
                            console.log(err)
                        }
                    });
                    return res.send(uploadModel);
                }
            });
        })
    })

=======
const jwtMiddleware = require("../../../config/jwtMiddleware");
const shopProvider = require("../../app/Shop/shopProvider");
const shopService = require("../../app/Shop/shopService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
var cors = require('cors');

const { PythonShell } = require("python-shell");

const s3Client = require("../../../config/s3");
// const multer  = require('multer');
var formidable = require('formidable')
var fs = require('fs');
const AWS = require('aws-sdk');

/**
 * API No. 6
 * API Name : 메인 페이지(인기 순, 추천리스트) API
 * [GET] /app/shop/main?sort=
 */
exports.getShopList = async function (req, res) {

    const sort = req.query.sort;

    // 인기순, 최신순의 나열 방식 입력
    // 지금은 그냥 일단 랜덤순으로 출력!
    console.log('main sort: ' + sort);

    const clothes = await shopProvider.retrieveClothes();

    return res.send(clothes);

}

/**
 * API No. 7
 * API Name : 쇼핑 페이지(전체 조회, 바지, 상의, 여성, 남성) API
 * [GET] /app/shop?category=?sort=
 */
exports.getShopCategoryList = async function (req, res) {

    const category = req.query.category;
    const sort = req.query.sort;

    // 인기순, 최신순의 나열 방식 입력
    console.log('category' + category);
    console.log('sort ' + sort);
    // 지금은 그냥 일단 랜덤순으로 출력!
    let clothes;

    if (!category) {
        clothes = await shopProvider.retrieveAllClothes();
    }

    if (category == "top") {
        console.log('top')
        clothes = await shopProvider.retrieveTops();
    }

    else if (category == "bottom") {
        console.log('bottom')
        clothes = await shopProvider.retrievePants();
    }

    else if (category == "men") {
        console.log('men')
        clothes = await shopProvider.retrieveMenClothes();
    }

    else if (category == "women") {
        console.log('women')
        clothes = await shopProvider.retrieveWomenClothes();
    }

    else {
        console.log('else')
        clothes = await shopProvider.retrieveAllClothes();
    }

    return res.send(clothes);

}

/**
 * API No. 8
 * API Name : 상품 페이지(자세한 정보) API
 * [GET] /app/shop/clothes/:clothesIdx
 */
exports.getClothesInfo = async function (req, res) {


    const clothesIdx = req.params.clothesIdx;
    // const userIdx = req.params.userIdx;

    // if (!userIdx)
    //     return res.send(response(baseResponse.USER_USERID_EMPTY));
    if (!clothesIdx)
        return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_EMPTY));

    // 존재하지 않는 유저인지 확인
    // const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    // console.log(userRows)
    // if (userRows.length < 1)
    //     return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

        const clothesRows = await shopProvider.clothesByClothesIdx(clothesIdx);
        console.log(clothesRows)
        if (clothesRows.length < 1)
            return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

        const clothesResult = await shopProvider.retrieveClothesInfo(clothesIdx);

        return res.send(clothesResult);

}

/**
 * API No. 9
 * API Name : 옷 찜하기 API
 * [POST] /app/shop/heart
 */
exports.postHeart = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    const {userIdx, clothesIdx, size} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const clothesRows = await shopProvider.clothesByClothesIdx(userIdx);
    console.log(clothesRows)
    if (clothesRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

    //이미 찜한 옷인지 확인
    const heartClothes = await shopProvider.checkHeartExists(userIdx, clothesIdx, size);
    console.log(heartClothes)
    if (heartClothes.length>0)
        return res.send(response(baseResponse.HEART_CLOTHES_EXIST));

   //상하의인지 가져오고 현재 db에 각 유저가 4개 있으면 거절하기
    //상의: 1, 하의: 2
    const clothesType = await shopProvider.clothesTypeByIdx(clothesIdx);
    console.log(clothesType[0].type)
    const checkTypeNum = await shopProvider.heartCheckByType(userIdx, clothesType[0].type);
    console.log(checkTypeNum)
    if (checkTypeNum.length >= 4)
        return res.send(response(baseResponse.CLOTHES_TYPE_OVER));

    // db에 status F로 있으면 status T로 바꿈, 없으면 새로 만들기
    const checkStatus = await shopProvider.checkHeartStatus(userIdx, clothesIdx, size);
    console.log(checkStatus)
    if (checkStatus.status == 'F') {
        const updateStatus = await shopService.updateHeartStatus(userIdx, clothesIdx, size);
        res.send(response(baseResponse.SUCCESS))
    }
    else {
        const createHeart = await shopService.postHeart(userIdx, clothesIdx, size);
        res.send(response(baseResponse.SUCCESS))
    }

};

/**
 * API No. 14
 * API Name : 옷 찜 취소하기 API
 * [PATCH] /app/shop/heart
 */
exports.patchHeart = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    const {userIdx, clothesIdx, size} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const clothesRows = await shopProvider.clothesByClothesIdx(userIdx);
    console.log(clothesRows)
    if (clothesRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

    //이미 찜한 옷인지 확인
    const heartClothes = await shopProvider.checkHeartExists(userIdx, clothesIdx, size);
    console.log(heartClothes)
    if (heartClothes.length<1)
        return res.send(response(baseResponse.HEART_CLOTHES_NOT_EXIST));

    const patchHeart = shopService.updateHeartStatusByIdx(userIdx, clothesIdx, size);
    return res.send(response(baseResponse.SUCCESS))
};


/**
 * API No. 10
 * API Name : 옷 구매하기 API
 * [POST] /app/shop/purchase
 */
exports.postPurchase = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    const {userIdx, clothesIdx, size} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const clothesRows = await shopProvider.clothesByClothesIdx(clothesIdx);
    console.log(clothesRows)
    if (clothesRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));


    const orderResponse = await shopService.createOrder(clothesIdx, userIdx, size);

    res.send(response(baseResponse.SUCCESS))
};

/**
 * API No. 10
 * API Name : 옷 피팅한 모델 가져오기 API
 * [POST] /app/shop/model
 */
// userIdx, clothesIdx, size로 현재 curModel에 가서 clothesIdx의 category확인하고 해당 category가 있으면 clothesIdx로 수정하고
// 3dModels가서 해당 링크 가져오기..?
exports.postModel = async function (req, res) {

    /**
     * Body: userIdx, clothesIdx
     */
    //const {userIdx, clothesIdx, size} = req.body;
    const {userIdx, topIdx, topSize, bottomIdx, bottomSize} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if (!topIdx)
        return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_EMPTY));
    if (!bottomIdx)
        return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_EMPTY));

    // 존재하지 않는 유저, 옷인지 확인
    const userRows = await shopProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    const topRows = await shopProvider.topByClothesIdx(topIdx);
    console.log(topRows)
    if (topRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));
    const bottomRows = await shopProvider.bottomByClothesIdx(bottomIdx);
    console.log(bottomRows)
    if (bottomRows.length < 1)
        return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

    let resultLocation = Date.now() + 'result.glb'
    var python = require('python-shell');
    var options = {
        mode: 'text',
        scriptPath: '',
        args: ['human.obj', 'top(black)_M.obj', 'L_01.obj', resultLocation,175]
    };
    PythonShell.run('modeling.py', options, function (err, results) {
        if (err) {
            console.log(err)
            throw err;
        }
        console.log(results);

        fs.readFile(resultLocation, function (err, data) {
            if (err) {
                console.log(err.toString())
            }

            // S3 upload
            var bucketName = 'usermodel'

            const s3 = new AWS.S3({
                accessKeyId: s3Client.accessid,
                secretAccessKey: s3Client.secret,
                region: 'ap-northeast-2',
                Bucket: bucketName
            });

            const params = {
                Bucket: 'usermodel',
                Key: resultLocation,
                Body: data
            };
            s3.upload(params, function(err, data) {
                if (err) {
                    //throw err;
                    console.log('error')
                    console.log(err)
                } else {
                    console.log(`File uploaded successfully.`);
                    console.log(data.Location)
                    //res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
                    return res.send(response(baseResponse.SUCCESS, data.Location));
                }
            });
        })
    })

    //const clothesModel = await shopProvider.clothesModelByIdx(userIdx, topIdx, topSize, bottomIdx, bottomSize);
    //return res.send(response(baseResponse.SUCCESS, clothesModel));

    // const clothesCategory = await shopProvider.retrieveClothesCategory(clothesIdx);
    // const clothesType = clothesCategory[0].type;
    // console.log(clothesType);
    //
    // let curModel;
    // //상의를 요청했으면..
    // // 1. 현재 뭘 입었는지 확인. 상의 있으면 요청한 상의로 수정, 하의 있으면 가져오기.
    // // 2. 요청한 상의와 하의로 그 모델 가져오기
    // if (clothesType == 1) {
    //     // 현재 입고 있는게 없으면 curModel에 추가하고 상의만 입은거 리턴
    //     const modelResponse = await shopProvider.retrieveCurClothes(clothesIdx, userIdx);
    //     console.log(modelResponse)
    //     if (modelResponse.length < 1) {
    //         console.log('postCurModel')
    //         const addCurModel = await shopService.postCurModel(userIdx, clothesIdx, size);
    //         console.log(addCurModel);
    //         const getModel = await shopProvider.retrieveTopModel(userIdx, clothesIdx, size);
    //         console.log(getModel)
    //         if (getModel.length < 1) return res.send(response(baseResponse.DB_ERROR));
    //         curModel = curModel = [ {"model" : getModel[0].model, "topIdx" : clothesIdx, "topSize" : size, "bottomIdx" : "", "bottomSize" : ""}];
    //     }
    //     else {
    //         console.log('top: ' + modelResponse[0].topIdx + ' bottom: ' + modelResponse[0].bottomIdx);
    //
    //         // 요청한 상의랑 현재 상의가 다르면 수정하기
    //         if (clothesIdx !== modelResponse[0].topIdx) {
    //             const orderResponse = await shopService.patchCurModel(clothesIdx, userIdx, size);
    //         }
    //         // 상의랑 하의로 된 모델 가져오기
    //         const getModel = await shopProvider.retrieveClothesModel(userIdx, clothesIdx, size, modelResponse[0].bottomIdx, modelResponse[0].bottomSize);
    //         console.log(getModel)
    //         if (getModel.length < 1) return res.send(response(baseResponse.DB_ERROR));
    //         curModel = [ {"model" : getModel[0].model, "topIdx" : clothesIdx, "topSize" : size, "bottomIdx" : modelResponse[0].bottomIdx, "bottomSize" : modelResponse[0].bottomSize}];
    //     }
    //
    //
    // } else if (clothesType == 2){ // 하의를 선택했으면
    //     // 현재 입고 있는게 없으면 curModel에 추가하고 상의만 입은거 리턴
    //     const modelResponse = await shopProvider.retrieveCurClothes(clothesIdx, userIdx);
    //     console.log(modelResponse)
    //     if (modelResponse.length < 1) {
    //         console.log('postCurModel bottom')
    //         const addCurModel = await shopService.postCurModelBottom(userIdx, clothesIdx, size);
    //         console.log(addCurModel);
    //         const getModel = await shopProvider.retrieveBottomModel(userIdx, clothesIdx, size);
    //         if (getModel.length < 1) return res.send(response(baseResponse.DB_ERROR));
    //         console.log(getModel)
    //         curModel = curModel = [ {"model" : getModel[0].model, "topIdx" : "", "topSize" : "", "bottomIdx" : clothesIdx, "bottomSize" : size}];
    //     }
    //     else {
    //         console.log('top: ' + modelResponse[0].topIdx + ' bottom: ' + modelResponse[0].bottomIdx);
    //
    //         // 요청한 하의랑 현재 하의가 다르면 수정하기
    //         if (clothesIdx !== modelResponse[0].bottomIdx) {
    //             console.log('change bottom')
    //             const orderResponse = await shopService.patchCurModelBottom(clothesIdx, userIdx, size);
    //         }
    //         // 상의랑 하의로 된 모델 가져오기
    //         const getModel = await shopProvider.retrieveClothesModel(userIdx, modelResponse[0].topIdx, modelResponse[0].topSize, clothesIdx, size);
    //         if (getModel.length < 1) return res.send(response(baseResponse.DB_ERROR));
    //         console.log(getModel)
    //         curModel = [ {"model" : getModel[0].model, "topIdx" : modelResponse[0].topIdx, "topSize" : modelResponse[0].topSize, "bottomIdx" : clothesIdx, "bottomSize" : size}];
    //     }
    //
    // } else {
    //     return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_INVALID));
    // }
    //
    // res.send(response(baseResponse.SUCCESS, curModel));
>>>>>>> 7fe0d024bf20c05f9d13f0d2002371be93a01756
};