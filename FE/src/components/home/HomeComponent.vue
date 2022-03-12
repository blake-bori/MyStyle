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
                                    <h6>프로모션 - 2 주제</h6>
                                    <h2>프로모션 - 2 제목</h2>
                                    <p>프로모션에 관한 내용 어쩌구 저쩌구.... 어쩌구 저쩌구....</p>
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
                    <!-- <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals"> -->
                    <!-- <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales"> -->
                    <!-- 할일 : 메인 페이지 필터링 적용 되는지 서버 연동 시도해보기 -->
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

                    <!-- <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                                <span class="label">New</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Piqué Biker Jacket</h6>
                                <a href="./detail" class="add-cart">상세정보</a>
                                <h5>$67.24</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Piqué Biker Jacket</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$67.24</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                                <span class="label">Sale</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Multi-pocket Chest Bag</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$43.48</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Diagonal Textured Cap</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$60.9</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-5.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Lether Backpack</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$31.37</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
                                <span class="label">Sale</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Ankle Boots</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$98.49</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>T-shirt Contrast Pocket</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$49.66</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-8.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$26.28</h5>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>
        <!-- Product Section End -->

        <!-- Categories Section Begin -->
        <!-- <section class="categories spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="categories__text">
                            <h2>
                                Clothings Hot <br />
                                <span>Shoe Collection</span> <br />
                                Accessories
                            </h2>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="categories__hot__deal">
                            <img src="img/product-sale.png" alt="" />
                            <div class="hot__deal__sticker">
                                <span>Sale Of</span>
                                <h5>$29.99</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 offset-lg-1">
                        <div class="categories__deal__countdown">
                            <span>Deal Of The Week</span>
                            <h2>Multi-pocket Chest Bag Black</h2>
                            <div class="categories__deal__countdown__timer" id="countdown">
                                <div class="cd-item">
                                    <span>3</span>
                                    <p>Days</p>
                                </div>
                                <div class="cd-item">
                                    <span>1</span>
                                    <p>Hours</p>
                                </div>
                                <div class="cd-item">
                                    <span>50</span>
                                    <p>Minutes</p>
                                </div>
                                <div class="cd-item">
                                    <span>18</span>
                                    <p>Seconds</p>
                                </div>
                            </div>
                            <a href="#" class="primary-btn">Shop now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- Categories Section End -->

        <!-- Instagram Section Begin -->
        <!-- <section class="instagram spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="instagram__pic">
                            <div class="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-1.jpg"></div>
                            <div class="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-2.jpg"></div>
                            <div class="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-3.jpg"></div>
                            <div class="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-4.jpg"></div>
                            <div class="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-5.jpg"></div>
                            <div class="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-6.jpg"></div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="instagram__text">
                            <h2>Instagram</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h3>#Male_Fashion</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- Instagram Section End -->

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
        goDetail(productIdx) {
            this.$store.commit("setProductIdx", productIdx);
        },
        setCategory(category) {
            this.$store.commit("setCategory", category);
        },
    },
};
</script>
