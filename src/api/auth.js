import http from "./http";

export async function login(userId, userPsw) {
    return http.post("/login", { userId: userId, password: userPsw });
}

export async function register(userId, userPsw, userName, userBodySize) {
    var gender = userBodySize.gender;
    var height = userBodySize.height;
    var weight = userBodySize.weight;
    var proportions = userBodySize.proportions;
    var muscle = userBodySize.muscle;

    return http.post("/", {
        userId: userId,
        password: userPsw,
        userName: userName,
        gender: gender,
        height: height,
        weight: weight,
        proportion: proportions,
        muscle: muscle,
    });
}

export async function myInfo(userIdx) {
    return http.get("/" + userIdx);
}
