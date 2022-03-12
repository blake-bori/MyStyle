import http from "./http";

export async function login(userId, userPsw) {
    return http.post("/app/users/login", { userId: userId, password: userPsw });
}

// export async function register(userId, userPsw, userName, userBodySize) {
//     var gender = userBodySize.gender;
//     var height = userBodySize.height;
//     var weight = userBodySize.weight;
//     var proportions = userBodySize.proportions;
//     var muscle = userBodySize.muscle;

//     return http.post("/app/users/", {
//         userId: userId,
//         password: userPsw,
//         userName: userName,
//         gender: gender,
//         height: height,
//         weight: weight,
//         proportion: proportions,
//         muscle: muscle,
//     });
// }

export async function register(userId, userPsw, userName, userBodySize) {
    const formData = new FormData();

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

export async function myInfo(userIdx) {
    return http.get("/app/users/" + userIdx);
}

export async function myHeart(userIdx) {
    return http.get("/app/users/" + userIdx + "/heart");
}
