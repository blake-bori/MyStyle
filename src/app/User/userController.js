const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {spawn} = require('child_process');
const { PythonShell } = require("python-shell");

const s3Client = require("../../../config/s3");
// const multer  = require('multer');
var formidable = require('formidable')
var fs = require('fs');
const AWS = require('aws-sdk');
//const extract = require('extract-zip')
//var JSZip = require("jszip");
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
 * API Name : 파이썬 파일 실행 API
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

    //가져온 zip파일 서버에 저장.
    fs.writeFile(file.name, file.data, (err)=>{
        if (err) {
            console.log(err)
            return res.send(response(baseResponse.SIGNUP_WRITE_MODEL_ERROR));
        }
    });

    // 회원가입처리
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

    //zip 압축 해제 후 서버 내 유저 디렉토리에 저장
    fs.createReadStream(file.name)
        .pipe(unzipper.Extract({path:target}));

    //유저의 모델로 쉽게 인식할 수 있게 파일 이름 바꾸기
    //회원가입이니까 파일 하나 업로드하면 될듯

    // fs.readdir(path, (err, files) => {
    //     console.log(files)
    //
    //     var i=0;
    //     files.forEach(file => {
    //         const asis = path + '/'+ file;
    //         const tobe = path + '/'+ 'human.obj';
    //         fs.rename(asis, tobe, function (err) {
    //             if (err){
    //                 console.log("rename error : " + asis + " => " + tobe)
    //                 console.log(err)
    //             }else{
    //                 console.log('renamed complete : ' + asis + " => " + tobe);
    //             }
    //         });
    //         i++
    //     })
    //
    // })


    // 서버 용량 아끼기 위해 zip 파일 삭제해놓기
    fs.unlink(file.name, err => {
        if(err){
            console.log("파일 삭제 Error 발생");
            console.log(err)
        }
    });


    //S3 업로드
    // var bucketName = 'usermodel'
    //
    // const s3 = new AWS.S3({
    //     accessKeyId: s3Client.accessid,
    //     secretAccessKey: s3Client.secret,
    //     region: 'ap-northeast-2',
    //     Bucket: bucketName
    // });
    //
    // const params = {
    //     Bucket: 'usermodel',
    //     Key: target,
    //     Body: files
    // };
    // s3.upload(params, function (err, data) {
    //     if (err) {
    //         //throw err;
    //         console.log('error')
    //         console.log(err)
    //     } else {
    //         console.log(`File uploaded successfully.`);
    //         console.log(data.Location)
    //         usermodelUrl = data.Location
    //         const updateUsermodel = userService.insertUsermodel(
    //             usermodelUrl, signUpResponseIdx
    //         );
    //         return res.send(updateUsermodel);
    //     }
    // });

    // try {
    //     await extract(file, { dir: target })
    //     console.log('Extraction complete')
    // } catch (err) {
    //     // handle any errors
    //     console.log(err)
    // }

    // console.log(s3Client.accessid)
    // console.log(s3Client.secret)


    // signUpResponse 값을 json으로 전달
    //return res.send(signUpResponse);
    return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 1.5
 * API Name : 회원가입시 파일 업로드 API
 * [POST] /app/users/images
 */
exports.postUserImage = async function (req, res) {

    /**
     * Body: bodyModel
     */
    var file = req.files.uploadFile;
    console.log(file)

    if (!req.files) {
        res.send({
            status: false,
            message: '파일 업로드 실패'
        });
    } else {
        var file = req.files.uploadFile;

        console.log(s3Client.accessid)
        console.log(s3Client.secret)
        var bucketName = 'usermodel'

        const s3 = new AWS.S3({
            accessKeyId: s3Client.accessid,
            secretAccessKey: s3Client.secret,
            region: 'ap-northeast-2',
            Bucket: bucketName
        });
        // s3.createBucket(function () {
        //     var params = {
        //         Bucket: bucketName
        //         Key: file.file.originalFilename,
        //         Body: file.data
        //     }
        // })

        const params = {
            Bucket: 'usermodel',
            Key: file.name,
            Body: file.data
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

    }

    return res.send(response(baseResponse.SUCCESS));


};

/**
 * API No. 2
 * API Name : 회원가입시 신체 입력 API
 * [POST] /app/users/my-size
 */
exports.postUserSize = async function (req, res) {

    /**
     * Body: userId, password, password2
     */
    const {
        userIdx, gender, height, weight, proportion, muscle
    } = req.body;


    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    const userRows = await userProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const signUpResponse = await userService.createUserSize(
        userIdx, gender, height, weight, proportion, muscle
    );

    // signUpResponse 값을 json으로 전달
    return res.send(signUpResponse);
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
    // errResponse 전달
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

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
    // errResponse 전달
    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const userRows = await userProvider.userByUserIdxCheck(userId);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    // userId를 통한 유저 검색 함수 호출 및 결과 저장
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


    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const userRows = await userProvider.userByUserIdxCheck(userIdx);
    console.log(userRows)
    if (userRows.length < 1)
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    if (!userName) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    else {
        const editUserInfo = await userService.editUser(userIdx, userName)
        return res.send(editUserInfo);
    }

};

// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
