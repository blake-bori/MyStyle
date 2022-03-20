module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    // const upload = require('../../../config/s3'); //업로드 모듈을 불러온다.
    // const multer  = require('multer');

    app.all('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    // 0. 테스트 API
     app.get('/app/test', user.getTest)

    app.get('/app/users/test', user.getPyTest);

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 1.5 회원가입시 파일 업로드 API
    app.post('/app/users/images', user.postUserImage);

     // 2. 회원가입시 신체 입력 API
     app.post('/app/users/my-size', user.postUserSize);

     // 4. 찜 목록 조회 API
    app.get('/app/users/:userIdx/heart', user.getUserHeart);

    // 2. 유저 조회 API (+ 검색)
    app.get('/app/users/:userIdx',user.getUsers);

    // 3. 특정 유저 조회 API
    app.get('/app/users/:userId', user.getUserById);

    // 로그인 하기 API (JWT 생성)
    app.post('/app/users/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/app/users', user.patchUsers)



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API