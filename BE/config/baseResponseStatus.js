//Response로 보내줄 에러 메세지 및 상태코드와 메세지

module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 2019, "message": "비밀번호를 확인해주세요" },
    SIGNUP_USER_EXIST : { "isSuccess": false, "code": 2020, "message": "이미 존재하는 아이디입니다." },
    CLOTHES_NOT_EXIST : { "isSuccess": false, "code": 2021, "message": "존재하지 않는 옷입니다." },
    SIGNIN_USERNAME_EMPTY : { "isSuccess": false, "code": 2022, "message": "유저의 이름을 입력해주세요" },
    SIGNIN_GENDER_EMPTY : { "isSuccess": false, "code": 2023, "message": "유저의 성별을 입력해주세요" },
    SIGNIN_HEIGHT_EMPTY : { "isSuccess": false, "code": 2024, "message": "유저의 키를 입력해주세요" },
    SIGNIN_WEIGHT_EMPTY : { "isSuccess": false, "code": 2025, "message": "유저의 몸무게를 입력해주세요" },
    SIGNIN_PROPORTION_EMPTY : { "isSuccess": false, "code": 2026, "message": "유저의 비율를 입력해주세요" },
    SIGNIN_MUSCLE_EMPTY : { "isSuccess": false, "code": 2027, "message": "유저의 근육을 입력해주세요" },
    CLOTHES_CLOTHESIDX_EMPTY : { "isSuccess": false, "code": 2028, "message": "옷 idx 값을 넣어주세요" },
    CLOTHES_CLOTHESIDX_INVALID : { "isSuccess": false, "code": 2029, "message": "옷 idx 값을 다시 확인해주세요" },
    SIGNIN_MODEL_EMPTY : { "isSuccess": false, "code": 2030, "message": "모델을 입력해주세요" },
    SIGNIN_FILE_EMPTY : { "isSuccess": false, "code": 2031, "message": "파일을 입력해주세요" },
    CLOTHES_SIZE_INVALID : { "isSuccess": false, "code": 2032, "message": "사이즈를 확인해주세요" },

    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
    CLOTHES_TYPE_OVER : { "isSuccess": false, "code": 3007, "message": "찜하기는 4개까지 가능합니다." },
    HEART_CLOTHES_EXIST : { "isSuccess": false, "code": 3008, "message": "이미 찜한 옷입니다." },
    HEART_CLOTHES_NOT_EXIST : { "isSuccess": false, "code": 3009, "message": "찜한 옷이 아닙니다." },
    SIGNUP_WRITE_MODEL_ERROR : { "isSuccess": false, "code": 3010, "message": "파일 업로드에 실패하였습니다" },
    MODEL_UPLOAD_ERROR : { "isSuccess": false, "code": 3011, "message": "모델 생성에 실패하였습니다." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},

 
 
}
