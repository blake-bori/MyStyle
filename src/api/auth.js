import http from "./http";

export async function login(userId, userPsw) {
    return http.post("/login", { userId: userId, password: userPsw });
}

export async function register(userId, userPsw, userName, userBodySize) {
    return http.post("/register", { userId: userId, password: userPsw, userName: userName, body: userBodySize });
}
