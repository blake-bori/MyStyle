<template>
    <div>
        <!-- 상단 메뉴바 section -->
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
        <!-- 옷 카테고리 선택 -->
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
                     <!-- class가 Top일때 상의를 필터링해서 보여줌 -->
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
                     <!-- class가 Bottom일때 하의를 필터링해서 보여줌 -->
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

                <p style="font-size:25px; font-weight:bold; text-align:center">
                    상의({{ selectTopName }}-{{ selectTopSize }}), 하의({{ selectBottomName }}-{{ selectBottomSize }})
                </p>
                <!-- 선택된 상의/하의를 모델링 하기 위한 버튼 -->
                <div class="row col-lg-2 m-auto">
                    <button type="button" @click="putOn" class="site-btn">입은 결과 확인</button>
                </div>
            </div>
        </section>
        <!-- 옷 카테고리 선택 Section End -->

        <!-- 모델링 객체를 그리기 위한 Canvas -->
        <div style="text-align:center; margin-bottom: 10px;">
            <div class="col-lg-8 col-md-6" style="display:inline-block; border: 1px solid black; height:600px">
                <ModelShow />
            </div>
        </div>
    </div>
</template>

<script>
import ModelShow from "./ModelShow.vue";
export default {
    data() {
        return {
            // 상/하의 선택 유무, 이름/사이즈를 받기위한 변수
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
            // 상/하의 두 개 모두 선택이 안되면 모델링 입히기가 안되도록 처리
            if (this.selectTop === "선택안됨" || this.selectBottom === "선택안됨") {
                alert("상 하의 모두 선택해야합니다.");
            } else {
                console.log(this.selectTop);
                console.log(this.selectBottom);

                this.$store.dispatch("getHeartModel", [this.userIdx, this.selectTop, this.selectTopSize, this.selectBottom, this.selectBottomSize]);
            }
        },
        // product index를 가지고 상세 페이지 이동
        goDetail(productIdx) {
            this.$store.commit("setProductIdx", productIdx);
        },
        // 선택된 옷 삭제
        deleteItem(clothesIdx, clothesSize) {
            this.$store.dispatch("deleteProduct", [this.userIdx, clothesIdx, clothesSize]);
        },
        // 상의 선택
        selectTopProduct(productIdx, name, mysize) {
            this.selectTop = productIdx;
            this.selectTopName = name;
            this.selectTopSize = mysize;
        },
        // 하의 선택
        selectBottomProduct(productIdx, name, mysize) {
            this.selectBottom = productIdx;
            this.selectBottomName = name;
            this.selectBottomSize = mysize;
        },
    },
    components: {
        // 캔버스에 그려질 모델 컴포넌트
        ModelShow,
    },
    computed: {
        // 찜한 상의 불러오기
        myHeartTopData() {
            return this.$store.state.product.heartTopData;
        },
        // 찜한 하의 불러오기
        myHeartBottomData() {
            return this.$store.state.product.heartBottomData;
        },
       
       // 사용하는지 확인 필요
        myHeartRecommendData() {
            return this.$store.state.product.relateData;
        },
        
        myHeartDataLength() {
            if (this.myHeartTopData != null && this.myHeartBottomData != null) return this.myHeartTopData.length + this.myHeartBottomData.length;
            else if (this.myHeartTopData == null && this.myHeartBottomData != null) return this.myHeartBottomData.length;
            else if (this.myHeartTopData != null && this.myHeartBottomData == null) return this.myHeartTopData.length;
            else return 0;
        },

        // 사용하는지 확인 필요
        myHeartRecommendDataLength() {
            if (this.myHeartRecommendData != null) return this.myHeartRecommendData.length;
            else return 0;
        },
        // 로그인 중인 유저의 index를 가져옴
        userIdx() {
            return this.$store.state.user.user.userIdx;
        },
    },
};
</script>
