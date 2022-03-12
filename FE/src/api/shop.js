import http from "./http";

// 홈화면 렌더시 인기상품&추천상품 리스트(정보) 가져옴
export async function homeContent() {
    return http.get("/app/shop/main?sort=0");
}

// 쇼핑화면 렌더시 상품들 리스트(정보) 가져옴
export async function shopContent() {
    return http.get("/app/shop?category=");
}

// 쇼핑화면 필터링(카테고리 등)적용해서 렌더시 필터링 해서 상품 리스트(정보) 가져옴
export async function shopFilterContent(filter) {
    if (filter === "all") {
        return http.get("/app/shop?category=");
    } else {
        return http.get("/app/shop?category=" + filter);
    }
}

// 상품화면 렌더시 상품 정보를 가져옴
// 유저 정보는 왜 쓰이는 거지???
export async function openDetail(clothId) {
    return http.get("/app/shop/clothes/" + clothId);
}

// 상품화면에서 찜하기 버튼 클릭시 유저정보 데이터베이스에 찜한 상품 목록이 추가됨
export async function addCart(userId, clothId, clothSize) {
    return http.post("/app/shop/heart", { userIdx: userId, clothesIdx: clothId, size: clothSize });
}

// 상품화면에서 구매 버튼 클릭시 유저정보 데이터베이스에 구매한 상품 목록이 추가됨
export async function purchase(userId, clothId, clothSize) {
    return http.post("/app/shop/purchase", { userIdx: userId, clothesIdx: clothId, size: clothSize });
}

// 쇼핑카트 화면에서 삭제 버튼 클릭 시
export async function deleteItem(userId, clothId, clothSize) {
    return http.patch("/app/shop/heart", { userIdx: userId, clothesIdx: clothId, size: clothSize });
}

export async function heartModel(userId, topIdx, topSize, bottomIdx, bottomSize) {
    // console.log(userId, topIdx, topSize, bottomIdx, bottomSize);
    return http.post("/app/shop/model", {
        userIdx: userId,
        topIdx: topIdx,
        topSize: topSize,
        bottomIdx: bottomIdx,
        bottomSize: bottomSize,
        // userIdx: 5,
        // topIdx: 1,
        // topSize: "s",
        // bottomIdx: 10,
        // bottomSize: "s",
    });
}
