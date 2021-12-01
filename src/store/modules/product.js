import * as shopApi from "@/api/shop";

export default {
    // state는 data와 같음
    // this.$store.state.변수명
    state: () => ({
        //홈화면의 인기&추천 상품 목록 데이터
        // {idx, imgUrl, name, price}
        homeProducts: [],
        // {clothes:{clothesIdx, name, price, imgUrl, description, model, isHeart}, size:{sizeIdx, sizeName}}
        productData: null,
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
            }
            console.log(state.homeProducts.length + "개의 상품 정보 Load");
        },
        addProductData(state, productData) {
            console.log("mutation - addProductData 실행");
            state.productData = productData;
            // 할일 : 서버로부터 받아온 obj파일이 CORS에 위배되어 오류 -> 해결방안 모색
            state.productData.clothes.model = "object/human/test.obj";
            // state.productData.size = [
            //     { sizeIdx: 1, sizeName: "S" },
            //     { sizeIdx: 2, sizeName: "M" },
            //     { sizeIdx: 3, sizeName: "L" },
            //     { sizeIdx: 4, sizeName: "XL" },
            // ];
            console.log(state.productData.clothes.name + "상품 정보 Load");
        },
        addCartResult(state, data) {
            console.log("mutation - addCartResult 실행");
            if (data.code == 1000) {
                alert("찜하기를 성공했습니다.");
            } else if (data.code == 2013) {
                alert("로그인이 필요합니다.");
                location.href = "./login";
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
    },
    // actions는 async methods(비동기)와 같다
    // this.$store.dispatch("함수명")
    actions: {
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
    },
};
