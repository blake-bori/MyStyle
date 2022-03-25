module.exports = function(app){
    const shop = require('./shopController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const cors = require('cors');

    // app.use(cors({
    //     origin: '*',
    //     credentials: true,
    // }));

    // 6. 메인 페이지(인기 순, 추천리스트) API
    app.get('/app/shop/main', shop.getShopList)

    // 7. 쇼핑 페이지(전체 조회, 바지, 상의, 여성, 남성) API
    app.get('/app/shop', shop.getShopCategoryList)

    // 8. 상품 페이지(자세한 정보) API
    app.get('/app/shop/clothes/:clothesIdx', shop.getClothesInfo)

    // 9. 옷 찜하기 API
    app.post('/app/shop/heart', shop.postHeart)

    // 10. 옷 상품 구매하기 API
    app.post('/app/shop/purchase', shop.postPurchase)

    // 11. 옷 피팅한 모델 가져오기 API
    app.post('/app/shop/model', shop.postModel)

    // 14. 옷 찜 취소하기
    app.patch('/app/shop/heart', shop.patchHeart)
};
