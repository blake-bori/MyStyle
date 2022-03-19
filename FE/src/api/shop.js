import http from "./http";

// 홈화면 정보 요청 (get)
export async function homeContent() {
    return http.get("/app/shop/main?sort=0");
}

// 쇼핑 페이지 정보 요청 (get)
export async function shopContent() {
    return http.get("/app/shop?category=");
}

// 쇼핑 페이지(필터링) 정보 요청 (get)
export async function shopFilterContent(filter) {
    if (filter === "all") {
        return http.get("/app/shop?category=");
    } else {
        return http.get("/app/shop?category=" + filter);
    }
}

// 상품 정보 요청 (get)
export async function openDetail(clothId) {
    return http.get("/app/shop/clothes/" + clothId);
}

// 상품 찜하기 요청 (post)
export async function addCart(userId, clothId, clothSize) {
    return http.post("/app/shop/heart", { userIdx: userId, clothesIdx: clothId, size: clothSize });
}

// 찜한 옷 삭제 요청 (patch)
export async function deleteItem(userId, clothId, clothSize) {
    return http.patch("/app/shop/heart", { userIdx: userId, clothesIdx: clothId, size: clothSize });
}

// 찜한 옷 입은 결과 정보 요청 (post)
export async function heartModel(userId, topIdx, topSize, bottomIdx, bottomSize) {
    return http.post("/app/shop/model", {
        userIdx: userId,
        topIdx: topIdx,
        topSize: topSize,
        bottomIdx: bottomIdx,
        bottomSize: bottomSize,
    });
}
