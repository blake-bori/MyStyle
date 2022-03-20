<template>
    <div>
        <!-- 프로모션 슬라이드 컨텐츠 -->
        <!-- Hero Section Begin -->
        <section class="hero">
            <div class="hero__slider owl-carousel">
                <!-- 프로모션 슬라이드 블록 -->
                <div class="hero__items set-bg" data-setbg="img/hero/hero-main2.png">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-5 col-lg-7 col-md-8">
                                <div class="hero__text">
                                    <!-- 신체 모델링관련 홍보로 신체 사이즈 측정 유도 -->
                                    <h6>마이스타일만의 특별한 첫번째 기능</h6>
                                    <h2>커스텀 마네킹</h2>
                                    <p style="color:#ffffff">자신의 체형과 매우 유사한 가상의 마네킹을 만들어<br />가상 피팅 시스템을 체험해보세요</p>
                                    <a href="#" class="primary-btn">회원가입하러가기<span class="arrow_right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero__items set-bg" data-setbg="img/hero/hero-2.jpg">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-5 col-lg-7 col-md-8">
                                <div class="hero__text">
                                    <!-- 신체 모델링관련 홍보로 신체 사이즈 측정 유도 -->
                                    <h6>마이스타일만의 특별한 두번째 기능</h6>
                                    <h2>찜한 옷 입어보기</h2>
                                    <p>자신만의 마네킹에 마음에 드는 옷을 적용해 보세요</p>
                                    <a href="#" class="primary-btn">Shop now <span class="arrow_right"></span></a>
                                    <div class="hero__social">
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                        <a href="#"><i class="fa fa-twitter"></i></a>
                                        <a href="#"><i class="fa fa-pinterest"></i></a>
                                        <a href="#"><i class="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Hero Section End -->

        <!-- 인기 상품 배너 컨텐츠 -->
        <!-- Banner Section Begin -->
        <section class="banner spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 offset-lg-4">
                        <div class="banner__item">
                            <div class="banner__item__pic">
                                <img src="img/banner/banner-3.jpg" alt="" />
                            </div>
                            <div class="banner__item__text">
                                <h2>카테고리별 인기 상품</h2>
                                <a href="./shop" @click="setCategory('all')">바로 가기</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="banner__item banner__item--middle">
                            <div class="banner__item__pic">
                                <img src="img/banner/banner-2.jpg" alt="" />
                            </div>
                            <div class="banner__item__text">
                                <h2>여성 인기 상품</h2>
                                <a href="./shop" @click="setCategory('women')">바로 가기</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="banner__item banner__item--last">
                            <div class="banner__item__pic">
                                <img src="img/banner/banner-1.jpg" alt="" />
                            </div>
                            <div class="banner__item__text">
                                <h2>남성 인기 상품</h2>
                                <a href="./shop" @click="setCategory('men')">바로 가기</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Banner Section End -->
        <!-- 인기 상품 배너 컨텐츠 끝 -->

        <!-- 인기 상품 리스트 -->
        <!-- Product Section Begin -->
        <section class="product spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="filter__controls">
                            <li class="active" data-filter="*">전체</li>
                            <li data-filter=".menList">남성</li>
                            <li data-filter=".womenList">여성</li>
                            <li data-filter=".hotProduct">인기 상품</li>
                        </ul>
                    </div>
                </div>
                <div class="row product__filter">
                    <!-- new-arrivals, hot-sales를 구분하기 위한 class -->
                    <div
                        v-for="product in homeProductList"
                        :key="product.idx"
                        class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix"
                        :class="{ menList: product.gender == 1 || product.gender == 3, womenList: product.gender == 1 || product.gender == 2, hotProduct: product.isRecommend === 'T' }"
                    >
                        <!-- class에 sale넣으면 검정 라벨 흰글씨, 안넣으면 흰 라벨 검정글씨 -->
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" :style="{ backgroundImage: 'url(' + product.imgUrl + ')' }">
                                <span v-if="product.isRecommend === 'T'" class="label">Hot</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail" @click="goDetail(product.idx)"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>{{ product.name }}</h6>
                                <a href="./detail" @click="goDetail(product.idx)" class="add-cart">상세정보</a>
                                <h5>{{ product.price/1000 }},000원</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Product Section End -->

        <!-- 팀원 소개 컨텐츠 -->
        <!-- Latest Blog Section Begin -->
        <section class="latest spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title">
                            <span>팀원 소개</span>
                            <h2>Team Members Information</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-4">
                        <div class="blog__item">
                            <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-1.jpg"></div>
                            <div class="blog__item__text">
                                <span><img src="img/icon/calendar.png" alt="" />Member#1</span>
                                <h5>이상원</h5>
                                <a href="https://github.com/sswon314" title="깃허브" target="_blank">프론트엔드</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="blog__item">
                            <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-2.jpg"></div>
                            <div class="blog__item__text">
                                <span><img src="img/icon/calendar.png" alt="" />Member#2</span>
                                <h5>임수이</h5>
                                <a href="https://github.com/SY-Mina" title="깃허브" target="_blank">백엔드</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="blog__item">
                            <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-3.jpg"></div>
                            <div class="blog__item__text">
                                <span><img src="img/icon/calendar.png" alt="" />Member#3</span>
                                <h5>홍세연</h5>
                                <a href="https://github.com/seyeon2" title="깃허브" target="_blank">프론트엔드</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Latest Blog Section End -->
        <!-- 팀원 소개 컨텐츠 -->
    </div>
</template>

<script>
export default {
    computed: {
        homeProductList() {
            return this.$store.state.product.homeProducts;
        },
        
    },
    methods: {
        // 디테일 페이지로 이동(상품 idx)
        goDetail(productIdx) {
            this.$store.commit("setProductIdx", productIdx);
        },
        // 선택한 카테고리에 대한 상품 페이지로 이동
        setCategory(category) {
            this.$store.commit("setCategory", category);
        },
    },
};
</script>
