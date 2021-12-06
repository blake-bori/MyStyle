<template>
    <div>
        <!-- Breadcrumb Section Begin -->
        <section class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__text">
                            <h4>About Us</h4>
                            <div class="breadcrumb__links">
                                <a href="./index.html">Home</a>
                                <a href="./index.html">My Page</a>
                                <span>Shopping Cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->
        <br /><br />
        <section class="product spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="filter__controls">
                            <li class="active" data-filter="*">All</li>
                            <li data-filter=".top">Top</li>
                            <li data-filter=".bottom">Bottom</li>
                        </ul>
                    </div>
                </div>

                <div class="row product__filter">
                    <div v-for="product in myHeartTopData" :key="product.clothesIdx + product.mysize" class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" :style="{ backgroundImage: 'url(' + product.imgUrl + ')' }">
                                <span class="label">Top</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="javascript:void(0);" @click="selectTopProduct(product.clothesIdx, product.name, product.mysize)">
                                            <img src="img/icon/select.png" alt="" /><span>상세정보</span></a
                                        >
                                    </li>
                                    <li>
                                        <a href="/shopping_cart" @click="deleteItem(product.clothesIdx, product.mysize)"><img src="img/icon/delete.png" alt="" /><span>상품삭제</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail" @click="goDetail(product.clothesIdx)"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>{{ product.name }} - {{ product.mysize }}</h6>
                                <a href="javascript:void(0);" @click="selectTopProduct(product.clothesIdx, product.name, product.mysize)" class="add-cart">입어보기</a>
                                <h5>{{ product.price }}</h5>
                            </div>
                        </div>
                    </div>

                    <div v-for="product in myHeartBottomData" :key="product.clothesIdx + product.mysize" class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" :style="{ backgroundImage: 'url(' + product.imgUrl + ')' }">
                                <span class="label">Bottom</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="javascript:void(0);" @click="selectBottomProduct(product.clothesIdx, product.name, product.mysize)">
                                            <img src="img/icon/select.png" alt="" /><span>상세정보</span></a
                                        >
                                    </li>
                                    <li>
                                        <a href="/shopping_cart" @click="deleteItem(product.clothesIdx, product.mysize)"><img src="img/icon/delete.png" alt="" /><span>상품삭제</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail" @click="goDetail(product.clothesIdx)"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>{{ product.name }} - {{ product.mysize }}</h6>
                                <a href="javascript:void(0);" @click="selectBottomProduct(product.clothesIdx, product.name, product.mysize)" class="add-cart">입어보기</a>
                                <h5>{{ product.price }}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <p>현재 선택된 옷 idx : 상의({{ selectTopName }}-{{ selectTopSize }}), 하의({{ selectBottomName }}-{{ selectBottomSize }})</p>
                <button type="button" @click="putOn" class="site-btn">입은 결과 확인</button>
            </div>
        </section>
        <!-- Product Section End -->

        <!-- Modeling Canvas -->
        <div style="text-align:center; margin-bottom: 10px;">
            <div class="col-lg-8 col-md-6" style="display:inline-block; border: 1px solid black; height:600px">
                <ModelShow />
            </div>
        </div>

        <!-- 추천 상품 리스트 - 미구현 -->
        <!-- Image Slider 3 Start -->
        <!-- <div class="recommand_text">
            <h5 style="font-size:25px;">Recommand</h5>
        </div>
        <section class="spad3">
            <div class="container">
                {{ myHeartRecommendDataLength }}
                <div class="row slick_slide" v-if="myHeartRecommendDataLength > 0">
                    <div v-for="product in myHeartRecommendData" :key="product.clothesIdx" class="col-3">
                        <div class="cloth">
                            <img src="img/shopping-cart/cart-1.jpg" alt="" class="img-fluid" />
                            <h5>{{ product.name }}</h5>
                            <p>{{ product.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- Image Slider 3 End -->
    </div>
</template>

<script>
import ModelShow from "./ModelShow.vue";
export default {
    data() {
        return {
            selectTop: "선택안됨",
            selectBottom: "선택안됨",
            selectTopName: "",
            selectBottomName: "",
            selectTopSize: "",
            selectBottomSize: "",
        };
    },
    methods: {
        putOn() {
            if (this.selectTop === "선택안됨" || this.selectBottom === "선택안됨") {
                alert("상 하의 모두 선택해야합니다.");
            } else {
                console.log(this.selectTop);
                console.log(this.selectBottom);

                this.$store.dispatch("getHeartModel", [this.userIdx, this.selectTop, this.selectTopSize, this.selectBottom, this.selectBottomSize]);
            }
        },
        goDetail(productIdx) {
            this.$store.commit("setProductIdx", productIdx);
        },
        deleteItem(clothesIdx, clothesSize) {
            this.$store.dispatch("deleteProduct", [this.userIdx, clothesIdx, clothesSize]);
        },
        selectTopProduct(productIdx, name, mysize) {
            this.selectTop = productIdx;
            this.selectTopName = name;
            this.selectTopSize = mysize;
        },
        selectBottomProduct(productIdx, name, mysize) {
            this.selectBottom = productIdx;
            this.selectBottomName = name;
            this.selectBottomSize = mysize;
        },
    },
    components: {
        ModelShow,
    },
    computed: {
        myHeartTopData() {
            return this.$store.state.product.heartTopData;
        },
        myHeartBottomData() {
            return this.$store.state.product.heartBottomData;
        },
        myHeartRecommendData() {
            return this.$store.state.product.relateData;
        },
        myHeartDataLength() {
            if (this.myHeartTopData != null && this.myHeartBottomData != null) return this.myHeartTopData.length + this.myHeartBottomData.length;
            else if (this.myHeartTopData == null && this.myHeartBottomData != null) return this.myHeartBottomData.length;
            else if (this.myHeartTopData != null && this.myHeartBottomData == null) return this.myHeartTopData.length;
            else return 0;
        },
        myHeartRecommendDataLength() {
            if (this.myHeartRecommendData != null) return this.myHeartRecommendData.length;
            else return 0;
        },
        userIdx() {
            return this.$store.state.user.user.userIdx;
        },
    },
};
</script>
