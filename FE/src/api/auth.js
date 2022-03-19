import http from "./http";

// 로그인 요청 (post)
export async function login(userId, userPsw) {
    return http.post("/app/users/login", { userId: userId, password: userPsw });
}

// 회원가입 요청 (post)
export async function register(userId, userPsw, userName, userBodySize) {
    const formData = new FormData();

    // 폼 데이터에 입력한 정보 넣음
    formData.append("userId", userId);
    formData.append("password", userPsw);
    formData.append("userName", userName);
    formData.append("gender", userBodySize.gender);
    formData.append("height", userBodySize.height);
    formData.append("weight", userBodySize.weight);
    formData.append("proportion", userBodySize.proportions);
    formData.append("muscle", userBodySize.muscle);
    formData.append("uploadFile", userBodySize.model);

    console.log("폼 데이터(아이디):",formData.get("userId"));
    console.log("폼 데이터(키):",formData.get("height"));
    console.log("폼 데이터(모델):",formData.get("uploadFile"));

    return http.post("/app/users/", formData, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Cookie,Accept,X-PINGOTHER",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "multipart/form-data",
        },
    });
}

// 마이페이지 정보 요청 (get)
export async function myInfo(userIdx) {
    return http.get("/app/users/" + userIdx);
}

// 쇼핑카트 정보 요청 (get)
export async function myHeart(userIdx) {
    return http.get("/app/users/" + userIdx + "/heart");
}
