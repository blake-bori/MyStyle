
const jwtMiddleware = require("../../../config/jwtMiddleware");
const shopProvider = require("../../app/Shop/shopProvider");
const shopService = require("../../app/Shop/shopService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
var cors = require('cors');

const { PythonShell } = require("python-shell");

const s3Client = require("../../../config/s3");
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
    // 지금은 그냥 일단 랜덤순으로 출력
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
    // 지금은 그냥 일단 랜덤순으로 출력
    let clothes;

    if (!category) {
        clothes = await shopProvider.retrieveAllClothes();
    }

    // 상의 조회 요청한 경우
    if (category == "top") {
        console.log('top')
        clothes = await shopProvider.retrieveTops();
    }

    // 하의 조회 요청한 경우
    else if (category == "bottom") {
        console.log('bottom')
        clothes = await shopProvider.retrievePants();
    }

    // 남성 옷 조회 요청한 경우
    else if (category == "men") {
        console.log('men')
        clothes = await shopProvider.retrieveMenClothes();
    }

    // 여성 옷 조회 요청한 경우
    else if (category == "women") {
        console.log('women')
        clothes = await shopProvider.retrieveWomenClothes();
    }

    // 기타 (모든 옷 조회)
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

    // 존재하지 않는 옷을 요청한 경우 validation 처리
    if (!clothesIdx)
        return res.send(response(baseResponse.CLOTHES_CLOTHESIDX_EMPTY));

    const clothesRows = await shopProvider.clothesByClothesIdx(clothesIdx);
    console.log(clothesRows)
    if (clothesRows.length < 1)
         return res.send(response(baseResponse.CLOTHES_NOT_EXIST));

    // 옷 정보 
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

    // 상하의인지 가져오고 현재 db에 각 유저가 4개 있으면 거절하기
    // 상의: 1, 하의: 2
    const clothesType = await shopProvider.clothesTypeByIdx(clothesIdx);
    console.log(clothesType[0].type)
    const checkTypeNum = await shopProvider.heartCheckByType(userIdx, clothesType[0].type);
    console.log(checkTypeNum)
    if (checkTypeNum.length >= 4)
        return res.send(response(baseResponse.CLOTHES_TYPE_OVER));

    // db에 status F로 있으면 status T로 바꿈, 없으면 db에 새로 만들기
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

    // 찜하기
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

    // 옷 주문하기
    const orderResponse = await shopService.createOrder(clothesIdx, userIdx, size);

    res.send(response(baseResponse.SUCCESS))
};

/**
 * API No. 10
 * API Name : 옷 피팅한 모델 가져오기 API
 * [POST] /app/shop/model
 */
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

    // 요청한 옷에 대하여 사람 모델에 입힌 모델 생성
    var topFile = '';
    var bottomFile = '';
    // 검은 반팔
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
    var filename = 'user' + userIdx+'.obj';
    var usermodel = ''

    // 파이썬으로 실행해서 결과값 가져오기
    var python = require('python-shell');
    var options = {
        mode: 'text',
        scriptPath: '',
        args: [filename, topFile, bottomFile, resultLocation,175]
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

            // S3에 파일 저장해서 url 가져오기 (서버에는 파일 저장하지 않기)
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
