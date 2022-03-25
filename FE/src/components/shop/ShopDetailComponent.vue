<template>
    <div>
        <!-- Shop Details Section Begin -->
        <section class="shop-details">
            <div class="product__details__pic">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__details__breadcrumb">
                                <a href="./mainl">Home</a>
                                <a href="./shop">Shop</a>
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
                                <div class="tab-pane active" id="tabs-1" role="tabpanel">ㄹ
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
                                    {{ productData.clothes.price / 1000 }},000원
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
                                </div>
                                <div class="product__details__cart__option">
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
                                            <div class="product__details__tab__content__item mb-5">
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
                                            <div class="product__details__tab__content__item mb-5">
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
	// productData가 있을때 해당 값을 리턴, 없으면 초기값 리턴
        productData() {
            if (this.$store.state.product.productData != null) return this.$store.state.product.productData;
            else
                return {
                    clothes: {
                        clothesIdx: -1,
                        name: "",
                        description: "",
                        price: "",
                        imgUrl: "",
                        model: "",
                        mtlfile: "",
                    },
                };
        },
	// 현재 접속중인 유저의 ID 가져오기
        userIdx() {
            return this.$store.state.user.user.userIdx;
        },
    },
    methods: {
	// 쇼핑카트에 담기
        requestAddCart() {
            this.$store.dispatch("addCart", [this.userIdx, this.productData.clothes.clothesIdx, this.clothSizeValues]);
        },
	// 구매하기
        requestPurchase() {
            this.$store.dispatch("purchase", [this.userIdx, this.productData.clothes.clothesIdx, this.clothSizeValues]);
        },
    },
};
</script>
