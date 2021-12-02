<template>
    <div>
        <!-- 페이지 위치 -->
        <!-- Breadcrumb Section Begin -->
        <section class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__text">
                            <h4>Shop</h4>
                            <div class="breadcrumb__links">
                                <a href="./index.html">Home</a>
                                <span>Shop</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <!-- Shop Section Begin -->
        <section class="shop spad">
            <div class="container">
                <div class="row">
                    <!-- 사이드 상품 필터링 -->
                    <div class="col-lg-3">
                        <div class="shop__sidebar">
                            <div class="shop__sidebar__search">
                                <form action="#">
                                    <input type="text" placeholder="Search..." />
                                    <button type="submit"><span class="icon_search"></span></button>
                                </form>
                            </div>

                            <!-- 사이드 상품 필터링-->
                            <div class="shop__sidebar__accordion">
                                <div class="accordion" id="accordionExample">
                                    <div class="card">
                                        <div class="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseOne">맞춤 상품</a>
                                        </div>
                                        <div id="collapseOne" class="collapse" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="shop__sidebar__recommends">
                                                    <ul class="nice-scroll">
                                                        <li><a href="#">인기 상품</a></li>
                                                        <li><a href="#">추천 상품</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseTwo">Categories</a>
                                        </div>
                                        <div id="collapseTwo" class="collapse show" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="shop__sidebar__categories">
                                                    <ul class="nice-scroll">
                                                        <li><a @click="filter('All')">All</a></li>
                                                        <li><a @click="filter('Men')">Men</a></li>
                                                        <li><a @click="filter('Women')">Women</a></li>
                                                        <li><a @click="filter('Top')">Top</a></li>
                                                        <li><a @click="filter('Bottom')">Bottom</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                                        </div>
                                        <div id="collapseThree" class="collapse" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="shop__sidebar__price">
                                                    <ul>
                                                        <li><a href="#">$0.00 - $50.00</a></li>
                                                        <li><a href="#">$50.00 - $100.00</a></li>
                                                        <li><a href="#">$100.00 - $150.00</a></li>
                                                        <li><a href="#">$150.00 - $200.00</a></li>
                                                        <li><a href="#">$200.00 - $250.00</a></li>
                                                        <li><a href="#">250.00+</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseFour">Colors</a>
                                        </div>
                                        <div id="collapseFour" class="collapse" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="shop__sidebar__color">
                                                    <label class="c-1" for="sp-1">
                                                        <input type="radio" id="sp-1" />
                                                    </label>
                                                    <label class="c-2" for="sp-2">
                                                        <input type="radio" id="sp-2" />
                                                    </label>
                                                    <label class="c-3" for="sp-3">
                                                        <input type="radio" id="sp-3" />
                                                    </label>
                                                    <label class="c-4" for="sp-4">
                                                        <input type="radio" id="sp-4" />
                                                    </label>
                                                    <label class="c-5" for="sp-5">
                                                        <input type="radio" id="sp-5" />
                                                    </label>
                                                    <label class="c-6" for="sp-6">
                                                        <input type="radio" id="sp-6" />
                                                    </label>
                                                    <label class="c-7" for="sp-7">
                                                        <input type="radio" id="sp-7" />
                                                    </label>
                                                    <label class="c-8" for="sp-8">
                                                        <input type="radio" id="sp-8" />
                                                    </label>
                                                    <label class="c-9" for="sp-9">
                                                        <input type="radio" id="sp-9" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 상품 목록 -->
                    <div class="col-lg-9">
                        <!-- 상품 리스트 상단의 옵션 -->
                        <div class="shop__product__option">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="shop__product__option__left">
                                        <p>Showing {{ 12 * page - 11 }}–{{ Math.min(productLength, 12 * page) }} of {{ Math.min(shopProductList.length, 12) }} results</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="shop__product__option__right">
                                        <p class="mr-1">정렬 기준 :</p>
                                        <select>
                                            <option value=""> 인기순</option>
                                            <option value=""> 낮은 가격순</option>
                                            <option value=""> 높은 가격순</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 상품 리스트 -->
                        <div class="row">
                            <div v-for="product in shopProductList" :key="product.idx" class="col-lg-4 col-md-6 col-sm-6">
                                <div class="product__item  sale">
                                    <div class="product__item__pic set-bg" :style="{ backgroundImage: 'url(' + product.imgUrl + ')' }">
                                        <span class="label">Sale</span>
                                        <ul class="product__hover">
                                            <li>
                                                <a href="./detail" @click="goDetail(product.idx)"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="product__item__text">
                                        <h6>{{ product.name }}</h6>
                                        <a href="./detail" @click="goDetail(product.idx)" class="add-cart">상세정보</a>
                                        <h5>{{ product.price }}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product__pagination">
                                    <a class="active" href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <span>...</span>
                                    <a href="#">21</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Shop Section End -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            //언제 불리는건지??
            page: 1,
        };
    },
    computed: {
        productLength() {
            return this.$store.state.product.shopProducts.length;
        },
        shopProductList() {
            return this.$store.state.product.shopProducts;
            // if (this.productLength > 12) {
            //     return this.$store.state.product.shopProducts.slice(0 * this.page, Math.min(this.productLength, 12 * this.page - 1));
            // } else {
            //     return this.$store.state.product.shopProducts;
            // }
        },
    },
    methods: {
        goDetail(productIdx) {
            this.$store.commit("setProductIdx", productIdx);
        },
        filter(inputFilter) {
            this.$store.dispatch("getFilterData", inputFilter);
        },
    },
};
</script>
