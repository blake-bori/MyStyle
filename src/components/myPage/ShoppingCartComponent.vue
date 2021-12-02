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

                <div class="sliders row product__filter" v-if="myHeartDataLength > 0">
                    <div v-for="product in myHeartTopData" :key="product.heartIdx" class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" :style="{ backgroundImage: 'url(' + product.imgUrl + ')' }">
                                <span class="label">Top</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail" @click="goDetail(product.heartIdx)"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>{{ product.name }}</h6>
                                <a href="javascript:void(0);" @click="putOn(product.heartIdx)" class="add-cart">입어보기</a>
                                <h5>{{ product.price }}</h5>
                            </div>
                        </div>
                    </div>

                    <div v-for="product in myHeartBottomData" :key="product.heartIdx" class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" :style="{ backgroundImage: 'url(' + product.imgUrl + ')' }">
                                <span class="label">Bottom</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail" @click="goDetail(product.heartIdx)"><img src="img/icon/search.png" alt="" /><span>상세정보</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>{{ product.name }}</h6>
                                <a href="javascript:void(0);" @click="putOn(product.heartIdx)" class="add-cart">입어보기</a>
                                <h5>{{ product.price }}</h5>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Piqué Biker Jacket 2</h6>
                                <a href="#" class="add-cart">상세정보</a>
                                <h5>$67.24</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Piqué Biker Jacket</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$67.24</h5>
                                <div class="product__color__select">
                                    <label for="pc-4">
                                        <input type="radio" id="pc-4" />
                                    </label>
                                    <label class="active black" for="pc-5">
                                        <input type="radio" id="pc-5" />
                                    </label>
                                    <label class="grey" for="pc-6">
                                        <input type="radio" id="pc-6" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                                <span class="label">Sale</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Multi-pocket Chest Bag</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$43.48</h5>
                                <div class="product__color__select">
                                    <label for="pc-7">
                                        <input type="radio" id="pc-7" />
                                    </label>
                                    <label class="active black" for="pc-8">
                                        <input type="radio" id="pc-8" />
                                    </label>
                                    <label class="grey" for="pc-9">
                                        <input type="radio" id="pc-9" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Diagonal Textured Cap</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$60.9</h5>
                                <div class="product__color__select">
                                    <label for="pc-10">
                                        <input type="radio" id="pc-10" />
                                    </label>
                                    <label class="active black" for="pc-11">
                                        <input type="radio" id="pc-11" />
                                    </label>
                                    <label class="grey" for="pc-12">
                                        <input type="radio" id="pc-12" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-5.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Lether Backpack</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$31.37</h5>
                                <div class="product__color__select">
                                    <label for="pc-13">
                                        <input type="radio" id="pc-13" />
                                    </label>
                                    <label class="active black" for="pc-14">
                                        <input type="radio" id="pc-14" />
                                    </label>
                                    <label class="grey" for="pc-15">
                                        <input type="radio" id="pc-15" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item sale">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
                                <span class="label">Sale</span>
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Ankle Boots</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$98.49</h5>
                                <div class="product__color__select">
                                    <label for="pc-16">
                                        <input type="radio" id="pc-16" />
                                    </label>
                                    <label class="active black" for="pc-17">
                                        <input type="radio" id="pc-17" />
                                    </label>
                                    <label class="grey" for="pc-18">
                                        <input type="radio" id="pc-18" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>T-shirt Contrast Pocket</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$49.66</h5>
                                <div class="product__color__select">
                                    <label for="pc-19">
                                        <input type="radio" id="pc-19" />
                                    </label>
                                    <label class="active black" for="pc-20">
                                        <input type="radio" id="pc-20" />
                                    </label>
                                    <label class="grey" for="pc-21">
                                        <input type="radio" id="pc-21" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix bottom">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-8.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-8.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-8.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix top">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="img/product/product-8.jpg">
                                <ul class="product__hover">
                                    <li>
                                        <a href="#"><img src="img/icon/delete.png" alt="" /><span>Delete</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>Buy</span></a>
                                    </li>
                                    <li>
                                        <a href="./detail"><img src="img/icon/search.png" alt="" /><span>Details</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>Basic Flowing Scarf</h6>
                                <a href="#" class="add-cart">+ Try it on </a>

                                <h5>$26.28</h5>
                                <div class="product__color__select">
                                    <label for="pc-22">
                                        <input type="radio" id="pc-22" />
                                    </label>
                                    <label class="active black" for="pc-23">
                                        <input type="radio" id="pc-23" />
                                    </label>
                                    <label class="grey" for="pc-24">
                                        <input type="radio" id="pc-24" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>
        <!-- Product Section End -->

        <!-- Modeling Canvas -->
        <div style="text-align:center; margin-bottom: 10px;">
            <div class="col-lg-8 col-md-6" style="display:inline-block; border: 1px solid black; width:600px; height:600px">
                <ModelShow />
            </div>
        </div>

        <!-- Image Slider 3 Start -->
        <div class="recommand_text">
            <h5 style="font-size:25px;">Recommand</h5>
        </div>
        <section class="spad3">
            <div class="container">
                {{ myHeartRecommendDataLength }}
                <div class="slick_slide row" v-if="myHeartRecommendDataLength > 0">
                    <div v-for="product in myHeartRecommendData" :key="product.clothesIdx" class="col-3">
                        <div class="cloth">
                            <img src="img/shopping-cart/cart-1.jpg" alt="" class="img-fluid" />
                            <h5>{{ product.name }}</h5>
                            <p>{{ product.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Image Slider 3 End -->
    </div>
</template>

<script>
import ModelShow from "./ModelShow.vue";
export default {
    methods: {
        putOn(idx) {
            console.log(idx);
        },
        goDetail(productIdx) {
            this.$store.commit("setProductIdx", productIdx);
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
            else return 0;
        },
        myHeartRecommendDataLength() {
            if (this.myHeartRecommendData != null) return this.myHeartRecommendData.length;
            else return 0;
        },
    },
};
</script>
