<template>
    <div class="shopDetail">
        <ShopDetailComponent @requestCart="addCart" @requestBuy="purchase"></ShopDetailComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import ShopDetailComponent from "@/components/shop/ShopDetailComponent.vue";
import * as shopApi from "@/api/shop";

export default {
    name: "ShopDetail",
    components: {
        ShopDetailComponent,
    },
    created() {
        shopApi
            .openDetail(3, 5)
            // 로드 성공 시
            .then((response) => {
                console.log("상품 : " + response.data.result);
                console.log("isSuccess : " + response.data.isSuccess);
                console.log("code : " + response.data.code);
                console.log("message : " + response.data.message);
            })
            //에러 발생 시
            .catch((error) => {
                console.log("에러" + error);
            });
    },
    methods: {
        addCart(inputData) {
            this.userId = inputData[0];
            this.clothId = inputData[1];
            this.clothSize = inputData[2];

            console.log("찜하기 시도 - 하위 컴포넌트로부터 전달 받은 값들(기본 정보) : " + this.userId + "," + this.clothId + "," + this.clothSize);

            shopApi
                .addCart(this.userId, this.clothId, this.clothSize)
                // 찜하기 성공 시
                .then((response) => {
                    console.log("message : " + response.data.message);
                    console.log("상품 : " + response.data.result);
                    console.log("isSuccess : " + response.data.isSuccess);
                    console.log("code : " + response.data.code);
                })
                // 에러 발생 시
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },

        purchase(inputData) {
            this.userId = inputData[0];
            this.clothId = inputData[1];
            this.clothSize = inputData[2];

            console.log("구매 시도 - 하위 컴포넌트로부터 전달 받은 값들(기본 정보) : " + this.userId + "," + this.clothId + "," + this.clothSize);

            shopApi
                .addCart(this.userId, this.clothId, this.clothSize)
                // 구매 성공 시
                .then((response) => {
                    console.log("message : " + response.data.message);
                    console.log("isSuccess : " + response.data.isSuccess);
                    console.log("code : " + response.data.code);
                })
                // 에러 발생 시
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
    },
};
</script>
