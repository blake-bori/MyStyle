const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {spawn} = require('child_process');
const { PythonShell } = require("python-shell");

const s3Client = require("../../../config/s3");
var formidable = require('formidable')
var fs = require('fs');
const AWS = require('aws-sdk');
var unzipper = require("unzipper")

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */

exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
}

/**
 * API No.
 * API Name : 파이썬 파일 실행 및 S3 업로드 테스트  API
 * [POST] /app/users/test
 */
exports.getPyTest = async function (req, res) {
    var python = require('python-shell');
    var options = {
        mode: 'text',
        scriptPath: ''
    };
    PythonShell.run('test.py', options, function (err, results) {
        if (err) {
            console.log(err)
            throw err;
        }
        console.log(results);

        fs.readFile('good.glb', function (err, data) {
            if (err) {
                console.log(err.toString())
            }
            //console.log(data)
            //console.log(data.toString())

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
                Key: 'plane1.glb',
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
                }
            });
        })
    })


    return res.send(response(baseResponse.SUCCESS))
}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: userId, password, userName, gender, height, weight, proportion, muscle
     */
    const {
        userId, password, userName, gender, height, weight, proportion, muscle
    } = req.body;
    //var file = req.files.uploadFile;
    //console.log(file)

    // 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if (!password)
        return res.send(response(baseResponse.SIGNIN_PASSWORD_EMPTY));
    if (!userName)
        return res.send(response(baseResponse.SIGNIN_USERNAME_EMPTY));
    // if (!gender)
    //     return res.send(response(baseResponse.SIGNIN_GENDER_EMPTY));
    if (!height)
        return res.send(response(baseResponse.SIGNIN_HEIGHT_EMPTY));
    if (!weight)
        return res.send(response(baseResponse.SIGNIN_WEIGHT_EMPTY));
    if (!proportion)
        return res.send(response(baseResponse.SIGNIN_PROPORTION_EMPTY));
    if (!muscle)
        return res.send(response(baseResponse.SIGNIN_MUSCLE_EMPTY));
    if (!req.files) {
        return res.send(response(baseResponse.SIGNIN_FILE_EMPTY));
    }

    const userRows = await userProvider.userCheck(userId);
    if (userRows.length > 0)
        return res.send(response(baseResponse.SIGNUP_USER_EXIST));

    var file = req.files.uploadFile;
    console.log(file)

    // 유저 회원가입 처리
    const signUpResponseIdx = await userService.createUser(
        userId, password, userName
    );

    const signUpResponse = await userService.createUserSize(
        signUpResponseIdx, gender, height, weight, proportion, muscle
    );
    console.log('userIdx: ' + signUpResponseIdx);


    let usermodelUrl;
    var target = 'user' + signUpResponseIdx;
    const path = './user'+signUpResponseIdx;
    
    // 가져온 파일 저장 user+userIdx 형식으로 파일 이름 변경
    var filename = 'user' + signUpResponseIdx+'.obj';
    fs.writeFile(filename, file.data, (err)=>{
        if (err) {
            console.log(err)
        }
        console.log('파일 저장함')
    });

    // signUpResponse 값을 json으로 전달
    //return res.send(signUpResponse);
    return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 3
 * API Name : 찜 목록 조회 API
 * [GET] /app/users/:userIdx/heart
 */
exports.getUserHeart = async function (req, res) {

    /**
     * Path Variable: userIdx
     */
    const userIdx = req.params.userIdx;
    // 빈 값 처리
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // 존재하지 않는 유저인지 확인
    const userRows = await userProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const heartByUserId = await userProvider.retrieveUserHeart(userIdx);
    return res.send(response(baseResponse.SUCCESS, heartByUserId));
};

/**
 * API No. 5
 * API Name : 유저 조회 API
 * [GET] /app/users/:userIdx
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const userIdx = req.params.userIdx;
    
    //존재하지 않는 유저인지 확인
    const userRows = await userProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const userInfoByIdx = await userProvider.retrieveUserInfo(userIdx);
    return res.send(response(baseResponse.SUCCESS, userInfoByIdx));

};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;
    // 빈 값 처리
    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
    //존재하지 않는 유저인지 확인
    const userRows = await userProvider.userByUserIdxCheck(userId);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    // userId를 통한 유저 검색
    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};

/**
 * API No. 3
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {userId, password} = req.body;

    const signInResponse = await userService.postSignIn(userId, password);

    return res.send(signInResponse);
};


/**
 * API No. 13
 * API Name : 회원 정보 수정 API
 * [PATCH] /app/users
 */
exports.patchUsers = async function (req, res) {

    const {
        userIdx, userName
    } = req.body;

    // 빈 값 처리
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    //존재하지 않는 유저인지 확인
    const userRows = await userProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    // 빈 값 처리
    if (!userName) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    else {
        const editUserInfo = await userService.editUser(userIdx, userName)
        return res.send(editUserInfo);
    }

};

