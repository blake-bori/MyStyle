import * as shopApi from "@/api/shop";
import * as authApi from "@/api/auth";

export default {
    // state는 data와 같음
    // this.$store.state.변수명
    state: () => ({
        //홈화면의 인기&추천 상품 목록 데이터
        // {idx, imgUrl, name, price}
        homeProducts: [],
        // 쇼핑화면의 상품 목록 데이터
        shopProducts: [],
        // 상품에 대한 정보 - {clothes:{clothesIdx, name, price, imgUrl, description, model, isHeart}, size:{sizeIdx, sizeName}}
        productData: null,
        // 찜 목록에 저장된 데이터
        heartTopData: null,
        heartBottomData: null,
        // 관련 상품 데이터
        relateData: null,

        //최종 렌더할 모델 데이터
        renderModelData: null,
    }),
    // getter는 computed와 같음
    // this.$store.state.변수명으로 state에 접근해서 사용
    getters: {},
    // mutations는 methods와 같음
    // 첫번째 인자는 state(변수 저장소),두번째 인자로 payload로 함수에 쓰일 파라미터들을 전달 (payload말고 그냥 변수 써도됨 payload는 여러 변수의 집합 느낌?)
    // this.$store.commit("함수명",{변수 파라미터들})
    mutations: {
        // 홈화면 데이터 가져와서 products배열에 저장
        addHomeData(state, homeProductList) {
            console.log("mutation - addHomeData 실행");
            state.homeProducts = [];

            for (var product of homeProductList) {
                state.homeProducts.push(product);
                console.log(product);
            }
            console.log(state.homeProducts.length + "개의 상품 정보 Load");
        },
        addShopData(state, shopProductList) {
            console.log("mutation - addShopData 실행");
            state.shopProducts = [];

            for (var product of shopProductList) {
                state.shopProducts.push(product);
            }
            console.log(state.shopProducts.length + "개의 상품 정보 Load");
        },
        addProductData(state, productData) {
            console.log("mutation - addProductData 실행");
            state.productData = productData;
            // state.productData.clothes.model = "object/human/test.obj";

            console.log(state.productData.clothes.name + "상품 정보 Load");
        },
        addCartResult(state, data) {
            console.log("mutation - addCartResult 실행");
            if (data.code == 1000) {
                alert("찜하기를 성공했습니다.");
            } else if (data.code == 2013) {
                alert("로그인이 필요합니다.");
                location.href = "./login";
            } else if (data.code == 3007) {
                alert("찜하기는 4개까지 가능합니다.");
            } else if (data.code == 3008) {
                alert("이미 찜한 옷입니다.");
            }
        },
        purchaseResult(state, data) {
            console.log("mutation - purchaseResult 실행");
            if (data.code == 1000) {
                alert("구매하기를 성공했습니다.");
            } else if (data.code == 2013) {
                alert("로그인이 필요합니다.");
                location.href = "./login";
            }
        },
        addMyHeart(state, data) {
            console.log("mutation - addMyHeart 실행");
            state.heartTopData = data.top;
            state.heartBottomData = data.bottom;
            state.relateData = data.recommend;

            console.log("상하의&관련 상품 정보 Load");
        },
        renderModel(state, data) {
            console.log("mutation - renderModel 실행");
            state.renderModelData = data;
        },
    },
    // actions는 async methods(비동기)와 같다
    // this.$store.dispatch("함수명")
    actions: {
        // 홈 화면의 인기&추천 상품 정보 리스트 서버로부터 get방식으로 가져오기
        getHomeData(context) {
            console.log("action - getHomeData 실행");
            shopApi
                .homeContent()
                // 로드 성공 시
                .then((response) => {
                    console.log("결과 : " + response.data.message);
                    console.log("성공여부 : " + response.data.isSuccess);
                    console.log("코드 : " + response.data.code);

                    context.commit("addHomeData", response.data.result);
                })
                //에러 발생 시
                .catch((error) => {
                    console.log("에러" + error);
                });
        },
        // 쇼핑 화면의 상품 정보 리스트 서버로부터 get방식으로 가져오기
        getShopData(context, filter) {
            console.log("action - getShopData 실행");
            console.log(filter + "필터링 시도");
            shopApi
                .shopFilterContent(filter)
                // 로드 성공 시
                .then((response) => {
                    console.log("결과 : " + response.data.message);
                    console.log("성공여부 : " + response.data.isSuccess);
                    console.log("코드 : " + response.data.code);

                    context.commit("addShopData", response.data.result);
                })
                //에러 발생 시
                .catch((error) => {
                    console.log("에러" + error);
                });
        },
        // 쇼핑 화면의 상품을 필터에 맞게 적용
        getFilterData(context, filter) {
            console.log("action - filterProduct 실행");
            console.log(filter + "필터링 시도");
            shopApi
                .shopFilterContent(filter)

                // 필터링 성공 시
                .then((response) => {
                    console.log("결과 : " + response.data.message);
                    console.log("성공여부 : " + response.data.isSuccess);
                    console.log("코드 : " + response.data.code);

                    context.commit("addShopData", response.data.result);
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
        // 상품 화면의 상품 정보 서버로부터 get방식으로 가져오기
        getProductData(context, value) {
            console.log("action - getProductData 실행");
            console.log(value);
            shopApi
                .openDetail(value)
                // 로드 성공 시
                .then((response) => {
                    console.log("결과 : " + response.data.message);
                    console.log("성공여부 : " + response.data.isSuccess);
                    console.log("코드 : " + response.data.code);

                    context.commit("addProductData", response.data.result[0]);
                })
                //에러 발생 시
                .catch((error) => {
                    console.log("에러" + error);
                });
        },
        addCart(context, inputData) {
            console.log("action - addCart 실행");
            shopApi
                .addCart(inputData[0], inputData[1], inputData[2])
                // 찜하기 성공 시
                .then((response) => {
                    console.log("결과 : " + response.data.message);
                    console.log("성공여부 : " + response.data.isSuccess);
                    console.log("코드 : " + response.data.code);

                    context.commit("addCartResult", response.data);
                })
                // 에러 발생 시
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
        deleteProduct(context, inputData) {
            console.log("action - deleteProduct 실행");
            // console.log("결과 : " + inputData[0]);
            // console.log("결과 : " + inputData[1]);
            // console.log("결과 : " + inputData[2]);

            shopApi
                .deleteItem(inputData[0], inputData[1], inputData[2])
                // 찜하기 성공 시
                .then((response) => {
                    console.log("결과 : " + response.data.message);
                    console.log("성공여부 : " + response.data.isSuccess);
                    console.log("코드 : " + response.data.code);
                })
                // 에러 발생 시
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
        purchase(context, inputData) {
            console.log("action - purchase 실행");
            shopApi
                .addCart(inputData[0], inputData[1], inputData[2])
                // 구매 성공 시
                .then((response) => {
                    console.log("결과 : " + response.data.message);
                    console.log("성공여부 : " + response.data.isSuccess);
                    console.log("코드 : " + response.data.code);

                    context.commit("purchaseResult", response.data);
                })
                // 에러 발생 시
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
        getHeartData(context, userIdx) {
            console.log("action - getHeartData 실행");
            authApi
                .myHeart(userIdx)
                // 마이페이지 정보 가져오기
                // isSuccess, code, message, result[{idx, userName, userId, email, phoneNum}] => 배열임
                .then((response) => {
                    console.log("마이페이지 가져오기 결과 : " + response.data.message);
                    if (response.data.isSuccess) {
                        console.log("결과 : " + response.data.message);
                        console.log("성공여부 : " + response.data.isSuccess);
                        console.log("코드 : " + response.data.code);

                        context.commit("addMyHeart", response.data.result);
                    } else {
                        // 로그인이 안되어있다면 로그인 필요하다는 알림과 함께 로그인 페이지로 이동
                        console.log("찜 목록 페이지 가져오기 실패");
                        alert("로그인 필요");
                        location.href = "./login";
                    }
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
        getHeartModel(context, data) {
            console.log("action - getHeartModel 실행");
            shopApi
                .heartModel(data[0], data[1], data[2], data[3], data[4])
                // 마이페이지 정보 가져오기
                // isSuccess, code, message, result[{idx, userName, userId, email, phoneNum}] => 배열임
                .then((response) => {
                    console.log("최종 모델 가져오기 결과 : " + response.data.message);
                    if (response.data.isSuccess) {
                        console.log("결과 : " + response.data.message);
                        console.log("성공여부 : " + response.data.isSuccess);
                        console.log("코드 : " + response.data.code);

                        context.commit("renderModel", response.data.result);
                    } else {
                        // 로그인이 안되어있다면 로그인 필요하다는 알림과 함께 로그인 페이지로 이동
                        console.log("최종 모델 가져오기 실패");
                    }
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
    },
};
