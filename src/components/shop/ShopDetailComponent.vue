<template>
    <div>
        <!-- Shop Details Section Begin -->
        <section class="shop-details">
            <div class="product__details__pic">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__details__breadcrumb">
                                <a href="./index.html">Home</a>
                                <a href="./shop.html">Shop</a>
                                <span>Product Details</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- 상품 이미지 썸네일 -->
                        <div class="col-lg-3 col-md-3">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                                        <div class="product__thumb__pic">
                                            <!-- 썸네일 그림은 조작 불가능하게 설정 -->
                                            <ModelDetailShow :url="productData.clothes.model" :enablePan="falseVal" :enableZoom="falseVal" :enableRotate="falseVal" />
                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
                                        <div class="product__thumb__pic set-bg" :style="{ backgroundImage: 'url(' + productData.clothes.imgUrl + ')' }"></div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
                                        <div class="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-2.png"></div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
                                        <div class="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-3.png"></div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- 썸네일 클릭시 메인 이미지로 보임 -->
                        <div class="col-lg-6 col-md-9">
                            <div class="tab-content">
                                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                    <!-- 할일 : 3D모델이 active된 상태에서 화면이 렌더되어야 3D모델이 보이는데 이유 찾아보기 -->
                                    <div class="product__details__pic__item" style="display:inline-block; border: 1px solid black; width:400px; height:500px">
                                        <ModelDetailShow :url="productData.clothes.model" :enablePan="trueVal" :enableZoom="trueVal" :enableRotate="trueVal" />
                                    </div>
                                </div>
                                <div class="tab-pane" id="tabs-2" role="tabpanel">
                                    <div class="product__details__pic__item">
                                        <img :src="productData.clothes.imgUrl" alt="" />
                                    </div>
                                </div>
                                <div class="tab-pane" id="tabs-3" role="tabpanel">
                                    <div class="product__details__pic__item">
                                        <img src="img/shop-details/product-big-3.png" alt="" />
                                    </div>
                                </div>
                                <div class="tab-pane" id="tabs-4" role="tabpanel">
                                    <div class="product__details__pic__item">
                                        <img src="img/shop-details/product-big.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 상품 설명 컨텐츠 -->
            <div class="product__details__content">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <div class="product__details__text">
                                <h4>{{ productData.clothes.name }}</h4>
                                <h3>
                                    {{ productData.clothes.price }}
                                    <!-- <span>70.00</span> -->
                                </h3>
                                <p>{{ productData.clothes.description }}</p>
                                <div class="product__details__option">
                                    <div class="product__details__option__size">
                                        <span>Size:</span>
                                        <label for="xl">
                                            xl
                                            <input type="radio" id="xl" v-model="clothSizeValues" value="xl" />
                                        </label>
                                        <label for="l">
                                            l
                                            <input type="radio" id="l" v-model="clothSizeValues" value="l" />
                                        </label>
                                        <label for="m" class="active">
                                            m
                                            <input type="radio" id="m" v-model="clothSizeValues" value="m" />
                                        </label>
                                        <label for="s">
                                            s
                                            <input type="radio" id="s" v-model="clothSizeValues" value="s" />
                                        </label>
                                    </div>
                                    <!-- <div class="product__details__option__color">
                                        <span>Color:</span>
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
                                        <label class="c-9" for="sp-9">
                                            <input type="radio" id="sp-9" />
                                        </label>
                                    </div> -->
                                </div>
                                <div class="product__details__cart__option">
                                    <!-- <div class="quantity">
                                        <div class="pro-qty">
                                            <input type="text" value="1" />
                                        </div>
                                    </div> -->
                                    <a href="javascript:void(0);" @click="requestAddCart" class="primary-btn">add to cart</a>
                                </div>
                                <div>
                                    <a href="javascript:void(0);" @click="requestPurchase" class="primary-btn">Buy now</a>
                                </div>
                                <div class="product__details__last__option">
                                    <br />
                                    <h5><span>Guaranteed Safe Checkout</span></h5>
                                    <img src="img/shop-details/details-payment.png" alt="" />
                                    <ul>
                                        <li><span>SKU:</span> 3812912</li>
                                        <li><span>Categories:</span> Clothes</li>
                                        <li><span>Tag:</span> Clothes, Skin, Body</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__details__tab">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">상품 설명</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">상세 정보</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-5" role="tabpanel">
                                        <div class="product__details__tab__content  text-center">
                                            <p class="note">
                                                상품 대표 설명 어쩌구 저쩌구
                                            </p>
                                            <div class="product__details__tab__content__item">
                                                <h5>상품 정보</h5>
                                                <p>{{ productData.clothes.description }}</p>
                                            </div>
                                            <div class="product__details__tab__content__item">
                                                <h5>상품 정보2</h5>
                                                <p>{{ productData.clothes.description }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-6" role="tabpanel">
                                        <div class="product__details__tab__content text-center">
                                            <div class="product__details__tab__content__item">
                                                <h5>Products Infomation</h5>
                                                <p>
                                                    A Pocket PC is a handheld computer, which features many of the same capabilities as a modern PC. These handy little devices allow individuals to
                                                    retrieve and store e-mail messages, create a contact file, coordinate appointments, surf the internet, exchange text messages and more. Every
                                                    product that is labeled as a Pocket PC must be accompanied with specific software to operate the unit and must feature a touchscreen and touchpad.
                                                </p>
                                                <p>
                                                    As is the case with any new technology product, the cost of a Pocket PC was substantial during it’s early release. For approximately $700.00,
                                                    consumers could purchase one of top-of-the-line Pocket PCs in 2003. These days, customers are finding that prices have become much more reasonable
                                                    now that the newness is wearing off. For approximately $350.00, a new Pocket PC can now be purchased.
                                                </p>
                                            </div>
                                            <div class="product__details__tab__content__item">
                                                <h5>Material used</h5>
                                                <p>
                                                    Polyester is deemed lower quality due to its none natural quality’s. Made from synthetic materials, not natural like wool. Polyester suits become
                                                    creased easily and are known for not being breathable. Polyester suits tend to have a shine to them compared to wool and cotton suits, this can make
                                                    the suit look cheap. The texture of velvet is luxurious and breathable. Velvet is a great choice for dinner party jacket and can be worn all year
                                                    round.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Shop Details Section End -->

        <!-- 상품과 비슷한 상품 -->
        <!-- Related Section Begin -->
        <!-- 할일 : 추천 시스템 혹은 미리 정해둔 로직에 따라 현재 페이지의 상품과 관련된 상품 정보를 같이 받아오도록 수정 -->
        <section class="related spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 class="related-title">관련 상품</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                                <span class="label">New</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
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
                    <div class="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
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
                    <div class="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                                <span class="label">Sale</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
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
                    <div class="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
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
                </div>
            </div>
        </section>
        <!-- Related Section End -->
    </div>
</template>

<script>
import ModelDetailShow from "./ModelDetailShow.vue";
export default {
    components: { ModelDetailShow },
    data() {
        return {
            clothSizeValues: "m",
            trueVal: true,
            falseVal: false,
        };
    },
    computed: {
        productData() {
            if (this.$store.state.product.productData != null) return this.$store.state.product.productData;
            else
                return {
                    clothes: {
                        clothesIdx: -1,
                        name: "",
                        price: "",
                        imgUrl: "",
                        description: "",
                        model: "",
                    },
                    size: [
                        {
                            sizeIdx: -1,
                            sizeName: "",
                        },
                    ],
                };
        },
        userIdx() {
            return this.$store.state.user.user.userIdx;
        },
    },
    methods: {
        requestAddCart() {
            this.$store.dispatch("addCart", [this.userIdx, this.productData.clothes.clothesIdx, this.clothSizeValues]);
        },

        requestPurchase() {
            this.$store.dispatch("purchase", [this.userIdx, this.productData.clothes.clothesIdx, this.clothSizeValues]);
        },
    },
};
</script>
