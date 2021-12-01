<template>
    <div class="shop">
        <ShopComponent @requestFilter="filter"></ShopComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import ShopComponent from "@/components/shop/ShopComponent.vue";
import * as shopApi from "@/api/shop";

export default {
    name: "Shop",
    components: {
        ShopComponent,
    },
    created() {
        shopApi
            .shopContent()
            // 로드 성공 시
            .then((response) => {
                console.log("message : " + response.data.message);
                console.log("상품");
                for (var r of response.data.result) {
                    console.log(r.idx + " : " + r.name);
                }
                console.log("isSuccess : " + response.data.isSuccess);
                console.log("code : " + response.data.code);
            })
            //에러 발생 시
            .catch((error) => {
                console.log("에러" + error);
            });
    },
    methods: {
        filter(inputFilter) {
            this.category = inputFilter;
            console.log("카테고리 : ", this.category);
            shopApi
                .shopFilterContent(this.category)

                // 필터링 성공 시
                .then((response) => {
                    console.log("message : " + response.data.message);
                    console.log("상품");
                    for (var r of response.data.result) {
                        console.log(r.idx + " : " + r.name);
                    }
                    console.log("isSuccess : " + response.data.isSuccess);
                    console.log("code : " + response.data.code);
                    //console.log("카테고리 : " + this.category);
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
    },
};
</script>
